package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/moby/patternmatcher"
)


func Index(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Content-Type", "application/json")
    w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

    if r.Method == "OPTIONS" {
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
        w.WriteHeader(http.StatusOK)
        fmt.Fprintln(w, `{"message": "OK"}`)
        return
    }

    // We don't want to allow anything other than POST and OPTIONS for now
    if r.Method != "POST" {
        w.WriteHeader(http.StatusMethodNotAllowed)
        fmt.Fprintln(w, `{"message": "Method not allowed"}`)
        return
    }

    excludePatterns, files, err := ExtractKeysFromRequest(r)
    matches := []bool{}

    if err != nil {
        w.WriteHeader(http.StatusBadRequest)   

        fmt.Fprintln(w, `{"message": "`+ err.Error() +`"}`)
        return
    }

    // Check that each file matches the given dockerfile patterns
    for i := 0; i < len(files); i++ {
        match, _ := patternmatcher.Matches(files[i], excludePatterns);
        matches = append(matches, match)
    }

    // Return the matches as a JSON array of booleans, where each boolean
    // represents whether the file at the same index matches the given patterns
    json, err := json.Marshal(matches)

    if err != nil {
        w.WriteHeader(http.StatusInternalServerError)
        fmt.Fprintln(w, `{"message": "Internal server error"}`)
    }

    fmt.Fprintln(w, string(json))
}

// ExtractKeysFromRequest extracts the 'dockerignore' and 'files' keys from
// the request body and returns them as string arrays respectively;
// Returns: dockerignoreStrings, filesStrings, error
func ExtractKeysFromRequest(r *http.Request) ([]string, []string, error) {
	var requestBody map[string]interface{}

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&requestBody)
	if err != nil {
		return nil, nil, err
	}

	// Extract keys from the request body
	dockerignore, ok := requestBody["dockerignore"].([]interface{})
	if !ok {
		return nil, nil, errors.New("'dockerignore' key not found or not an array")
	}

	files, ok := requestBody["files"].([]interface{})
	if !ok {
		return nil, nil, errors.New("'files' key not found or not an array")
	}

	// Convert interface arrays to string arrays
	dockerignoreStrings := make([]string, len(dockerignore))
	filesStrings := make([]string, len(files))

	for i, v := range dockerignore {
		dockerignoreStrings[i] = v.(string)
	}
    
	for i, v := range files {
		filesStrings[i] = v.(string)
	}

	return dockerignoreStrings, filesStrings, nil
}