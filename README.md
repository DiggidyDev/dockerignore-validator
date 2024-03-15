# Table of Contents

-   [About](#about)
    -   [Feature list](#feature-list)
-   [Local Development](#local-development)
    -   [Testing](#testing)
    -   [Adding new tests](#adding-new-tests)
-   [API Endpoints](#api-endpoints)
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

### Adding new tests

If you wish to add a new e2e test, it should live under:

```
cypress/
└── e2e/
    └── TestName.cy.ts
```

##### Tree diagram generated courtesy of [Nathan Friend's Tree tool](https://tree.nathanfriend.io/)

If you wish to add a new component test, it should live under:

```
src/
└── app/
    └── components/
        └── ComponentName/
            ├── ComponentName.cy.tsx
            └── ComponentName.tsx
```

##### Tree diagram generated courtesy of [Nathan Friend's Tree tool](https://tree.nathanfriend.io/)

## API Endpoints

When interacting with the API, no validation is required as of now.

It's important to note that each **Response example** is what would be returned from the endpoint as though the **Request Body** was provided.

### `/api/validate`

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
