package api

import (
	"bytes"
	"testing"

	"net/http"
	"net/http/httptest"
)

// TODO: Add tests for response body (All TestIndex tests)
func TestIndex_ShouldNotErrorForPOST(t *testing.T) {
    req, err := http.NewRequest(http.MethodPost, "/", bytes.NewBuffer([]byte(`{"dockerignore":["pattern1", "pattern2"],"files":["file1", "file2"]}`)))
    
    if err != nil {
        t.Fatal(err)
    }

    rr := httptest.NewRecorder()
    handler := http.HandlerFunc(Index)
    
    handler.ServeHTTP(rr, req)

    if rr.Code != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v", rr.Code, http.StatusOK)
    }
}


func TestIndex_ShouldAllowOPTIONS(t *testing.T) {
    req, err := http.NewRequest(http.MethodOptions, "/", nil)
    handler := http.HandlerFunc(Index)

    if err != nil {
        t.Fatal(err)
    }

    rr := httptest.NewRecorder()
    handler.ServeHTTP(rr, req)

    if rr.Code != http.StatusOK {
        t.Errorf("Handler returned wrong status code: got %v want %v", rr.Code, http.StatusOK)
    }
}

func TestIndex_ShouldNotAllowGET(t *testing.T) {
    req, err := http.NewRequest(http.MethodGet, "/", nil)
    handler := http.HandlerFunc(Index)

    if err != nil {
        t.Fatal(err)
    }

    rr := httptest.NewRecorder()
    handler.ServeHTTP(rr, req)

    if rr.Code != http.StatusMethodNotAllowed {
        t.Errorf("Handler returned wrong status code: got %v want %v", rr.Code, http.StatusMethodNotAllowed)
    }
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