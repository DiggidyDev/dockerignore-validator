# Table of Contents

-   [About](#about)
    -   [Feature list](#feature-list)

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
-   [ ] API
    -   [ ] Allow programmatic `POST`s to a `/api/validate` endpoint
        -   [ ] Response includes information about the validity of the `.dockerignore`
