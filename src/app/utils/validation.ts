import type { RepositoryDetails } from "./interfaces";

/**
 * A utility function for extracting sections of a GitHub repository URL.
 * @param url The GitHub repo URL to extract details from
 * @returns An object containing the owner, repository, and tree, or undefined if the URL is invalid
 */
export function extractRepoDetails(url: string): RepositoryDetails | undefined {
    const regex =
        /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:tree|blob|releases\/tag|commit)\/(.+)/;
    const match = url.match(regex);

    if (match) {
        const [_, owner, repository, tree] = match;

        return { owner, repository, tree };
    }
}
