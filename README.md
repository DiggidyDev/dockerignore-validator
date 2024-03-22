# Table of Contents

-   [About](#about)
    -   [Feature list](#feature-list)
-   [Local Development](#local-development)
    -   [Testing](#testing)
    -   [Adding new tests](#adding-new-tests)
-   [API Endpoints](#api-endpoints)
    -   [`/api/files`](#apifiles)
    -   [`/api/validate`](#apivalidate)

## About

A tool to verify your `.dockerignore` file configuration.

### Features

-   [x] Visual interface
    -   [ ] Syntax guide for writing a well-formed `.dockerignore` file
    -   [x] Input your `.dockerignore` configuration to validate its syntax
        -   [ ] Highlight any syntax errors (+ duplicate lines)
    -   [x] Input a project/directory structure to match using the `.dockerignore`
        -   [ ] Display all files which will match against the config file, and those that won't
    -   [ ] Input a GitHub URL (public for now, maybe auth in future for private repos?)
        -   [ ] Automagically run the `.dockerignore` against the repo's structure
-   [x] API
    -   [x] Allow programmatic `POST`s to a `/api/validate` endpoint
        -   [ ] Response includes information about the validity of the `.dockerignore`

## Local Development

As far as prerequisites go, you will need to have the [Vercel CLI installed](https://vercel.com/docs/cli#installing-vercel-cli).

To run this project locally, clone it onto your local machine.

```bash
git clone git@github.com:DiggidyDev/dockerignore-validator.git
```

You can start a local development server with:

```bash
vercel dev
```

### Testing

To open Cypress for local testing:

```bash
npm run test
```

To run all e2e tests headlessly:

```bash
npm run test:e2e
```

###### Ensure your development server is running for the e2e tests to run

To run all component tests headlessly:

```bash
npm run test:cmp
```

###### No development server is required for these tests to run

Unit testing has been implemented using [mocha](https://mochajs.org/). As is the convention with component tests, all unit tests should be stored in the same directory as their tested file - **not** in a separate `tests` or `__tests__` directory.

To run all unit tests, you can use the following command:

```bash
npm run test:unit
```

And with coverage:

```bash
npm run test:unit:cov
```

### Adding new tests

If you wish to add a new e2e test, it should live under:

```
cypress/
└── e2e/
    └── TestName.cy.ts
```

If you wish to add a new component test, it should live under:

```
src/
└── app/
    └── components/
        └── ComponentName/
            ├── ComponentName.cy.tsx
            └── ComponentName.tsx
```

Unit tests are discovered under a `src/**/*.spec.ts` glob pattern. They should be stored in the same directory as the file that they're testing, with the same filename as the prefix. For example:

```
src/
└── app/
    └── utils/
        ├── foo.ts
        └── foo.spec.ts
```

## API Endpoints

When interacting with the API, no validation is required as of now.

It's important to note that each **Response example** is what would be returned from the endpoint as though the **Request body** was provided.

### `/api/files`

-   **Description**: Retrieves a GitHub repository's files recursively.
-   **Method**: `GET`
-   **Parameters**:
    -   `url` - The URL of the GitHub repository whose files should be fetched. The following URL formats are allowed, where `https://` is optional and interchangeable with `http://`, and `www.` is optional:
        -   `github.com/DiggidyDev/dockerignore-validator/tree/main`
        -   `github.com/DiggidyDev/dockerignore-validator/releases/tag/v0.0.1`
        -   `github.com/DiggidyDev/dockerignore-validator/commit/0116624989d8582e8e20e5a6c285eac598a60fae`
            -   For more information on the valid regex types, see `/src/app/utils/validation.spec.ts`
    -   `includeDockerignore` - A boolean denoting whether a root-level `.dockerignore` file should be fetched, if found
-   **Request body**: N/A
-   **Response description**: An object containing all files, and directories, of the given repository (limited by [GitHub's REST API](https://docs.github.com/en/rest/git/trees?apiVersion=2022-11-28#get-a-tree)). If no dockerignore was found, the `dockerignore` key will still be returned, just as an empty list.
-   **Response example**:
    ```json
    {
        "dockerignore": [".gitignore", ".git", "build", "node_modules"],
        "files": [
            ".env.test",
            ".github", // directories are included as part of the files
            ".github/workflows",
            ".github/workflows/example.yaml",
            ".gitignore",
            "..."
        ]
    }
    ```
    **Response MIME type**: `application/json`

### `/api/validate`

-   **Description**: Validates filepaths against a .dockerignore configuration.
-   **Method**: `POST`
-   **Parameters**: N/A
-   **Request body**:
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

## Attributions

-   The [tree diagram](https://tree.nathanfriend.io/) generation tool by @nfriend - all ASCII trees generated in this README have been generated using the tool
