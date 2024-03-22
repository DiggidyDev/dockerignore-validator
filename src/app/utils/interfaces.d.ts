import { Dispatch, SetStateAction } from "react";

interface RepositoryDetails {
    owner: string;
    repository: string;
    tree: string;
}

interface UseGithubRepoOptions {
    includeDockerignore: boolean;
}

interface OptionsContext {
    showIgnored: boolean;
    showOptions: boolean;
    setShowIgnored: Dispatch<SetStateAction<boolean>>;
    setShowOptions: Dispatch<SetStateAction<boolean>>;
}

interface ValidationContext {
    // Inputs
    dockerignore: string;
    error: string | undefined;
    files: string;
    isFetchingRepo: boolean;
    setDockerignore: Dispatch<SetStateAction<string>>;
    setError: Dispatch<SetStateAction<string | undefined>>;
    setFiles: Dispatch<SetStateAction<string>>;
    setIsFetchingRepo: Dispatch<SetStateAction<boolean>>;

    // Output
    isEvaluating: boolean;
    result: boolean[];
    setIsEvaluating: Dispatch<SetStateAction<boolean>>;
    setResult: Dispatch<SetStateAction<boolean[]>>;
}
