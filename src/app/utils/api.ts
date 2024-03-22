/* istanbul ignore next */
import type { UseGithubRepoOptions } from "./interfaces";
import { extractRepoDetails } from "./validation";

export const stringifyOptions = (
    options: Record<string, boolean | number | string>
) => {
    const result = new URLSearchParams();

    for (const key in options) {
        if (options[key] === "") continue;

        // had to go down this route because typescript wasn't a fan
        // of stringifying boolean values
        result.append(key, options[key].toString());
    }

    return result;
};

const defaultOptions: UseGithubRepoOptions = {
    includeDockerignore: true,
};

export async function getGithubRepo(
    url: string,
    options: UseGithubRepoOptions = defaultOptions
) {
    const isValidUrl = !!extractRepoDetails(url);
    if (!isValidUrl && url) {
        throw new Error("Invalid URL");
    }

    const stringifiedOptions = stringifyOptions({ ...options, url });
    const endpoint = "/api/files?" + stringifiedOptions;

    const res = await fetch(endpoint);

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
}

export function processFiles(
    files: string,
    result: boolean[],
    showIgnored: boolean
) {
    const filepaths = files.split("\n");

    const isIgnored = (fp: string, i: number) =>
        showIgnored ? result[i] : !result[i];

    return filepaths.filter(isIgnored).join("\n").trim();
}
