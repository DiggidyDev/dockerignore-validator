# Table of Contents

-   [About](#about)
    -   [Feature list](#feature-list)
-   [API Endpoints](#api-endpoints)
    -   [`/api/validate`](#apivalidate)

# About

A tool to verify your `.dockerignore` file configuration.

## Features

-   [ ] Visual interface
    -   [ ] Syntax guide for writing a well-formed `.dockerignore` file
    -   [ ] Input your `.dockerignore` configuration to validate its syntax
        -   [ ] Highlight any syntax errors (+ duplicate lines)
    -   [ ] Input a project/directory structure to match using the `.dockerignore`
        -   [ ] Display all files which will match against the config file, and those that won't
    -   [ ] Input a GitHub URL (public for now, maybe auth in future for private repos?)
        -   [ ] Automagically run the `.dockerignore` against the repo's structure
-   [x] API
    -   [x] Allow programmatic `POST`s to a `/api/validate` endpoint
        -   [ ] Response includes information about the validity of the `.dockerignore`

# API Endpoints

When interacting with the API, no validation is required as of now.

It's important to note that each **Response example** is what would be returned from the endpoint as though the **Request Body** was provided.

## `/api/validate`

-   **Description**: Validates filepaths against a .dockerignore configuration.
-   **Method**: `POST`
-   **URL**: `/endpoint-url`
-   **Parameters**: N/A
-   **Request Body**:
    ```json
    {
        "dockerignore": ["node_modules", "**/*.jpg"],
        "files": [
            ".gitignore",
            "hello.jpg",
            "node_modules/@babel",
            "src/index.ts"
        ]
    }
    ```
-   **Response description**: An array of booleans, corresponding to each filepath, denoting whether the filepath will be ignored or not
-   **Response example**:
    ```json
    [false, true, true, false]
    ```
-   **Response MIME type**: `application/json`
