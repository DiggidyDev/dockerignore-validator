package api

import (
	"bytes"
	"testing"

	"net/http"
	"net/http/httptest"
)

// TODO
func TestIndex(t *testing.T) {
    r, _ := http.NewRequest(http.MethodPost, "/api/validate", bytes.NewBuffer([]byte(`{"dockerignore": ["Dockerfile*"], "files": ["Dockerfile", "Dockerfile.dev"]}`)))
    w := httptest.NewRecorder()

    Index(w, r)
}

func TestExtractKeysFromRequest_ShouldNotError(t *testing.T) {
    r, _ := http.NewRequest(http.MethodPost, "/api/validate", bytes.NewBuffer([]byte(`{"dockerignore": ["Dockerfile*"], "files": ["Dockerfile", "Dockerfile.dev"]}`)))

    dockerignoreStrings, fileStrings, err := ExtractKeysFromRequest(r)

    t.Log(dockerignoreStrings, fileStrings, err)

    if err != nil {
        t.Errorf("Unexpected error: %s", err)
    }

    if len(dockerignoreStrings) != 1 {
        t.Errorf("Expected 1 dockerignore string, got %d", len(dockerignoreStrings))
    }

    if len(fileStrings) != 2 {
        t.Errorf("Expected 2 file strings, got %d", len(fileStrings))
    }
}

func TestExtractKeysFromRequest_ShouldThrowMissingDockerfileKey(t *testing.T) {
    r, _ := http.NewRequest(http.MethodPost, "/api/validate", bytes.NewBuffer([]byte(`{"files": ["Dockerfile", "Dockerfile.dev"]}`)))

    dockerignoreStrings, fileStrings, err := ExtractKeysFromRequest(r)

    t.Log(dockerignoreStrings, fileStrings, err)

    if err == nil {
        t.Errorf("Expected an error, instead got valid values: %s %s", dockerignoreStrings, fileStrings)
    }
}

func TestExtractKeysFromRequest_ShouldThrowMissingFilesKey(t *testing.T) {
    r, _ := http.NewRequest(http.MethodPost, "/api/validate", bytes.NewBuffer([]byte(`{"dockerignore": ["Dockerfile*"]}`)))

    dockerignoreStrings, fileStrings, err := ExtractKeysFromRequest(r)

    t.Log(dockerignoreStrings, fileStrings, err)

    if err == nil {
        t.Errorf("Expected an error, instead got valid values: %s %s", dockerignoreStrings, fileStrings)
    }
}