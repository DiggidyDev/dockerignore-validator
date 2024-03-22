import type {
    VercelRequest,
    VercelRequestQuery,
    VercelResponse,
} from "@vercel/node";
import { octoFetch } from "../_utils.js";
import { extractRepoDetails } from "../../src/app/utils/validation.js";

const defaultUrl = process.env.NEXT_PUBLIC_SAMPLE_GITHUB_REPO;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        // If this passes, we can be sure that all parameters are valid going
        // forward
        validateParams(req.query);
    } catch (e: unknown) {
        return res.status(400).json({ error: (e as Error).message });
    }

    // required params
    let repoUrl: string = (req.query.url as string) ?? defaultUrl;

    // optional params
    const returnDockerignore = req.query.includeDockerignore === "true";

    // We can say with certainty that repo details will be extracted because
    // either the param validation check passed successfully, or the default
    // URL is being used
    const { owner, repository, tree } = extractRepoDetails(repoUrl)!;

    try {
        const resp = await octoFetch(
            `GET /repos/${owner}/${repository}/git/trees/${tree}?recursive=true`
        );

        const files: string[] = resp.data.tree.map((file: any) => file.path);

        let dockerignore: string[] = [];
        if (returnDockerignore && files.includes(".dockerignore")) {
            const dockerignoreResp = await octoFetch(
                `GET /repos/${owner}/${repository}/contents/.dockerignore`
            );

            dockerignore = Buffer.from(dockerignoreResp.data.content, "base64")
                .toString("utf-8")
                .split("\n");
        }

        return res.status(200).json({
            dockerignore,
            files,
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Internal server error" });
    }
}

/**
 * Ensure all params are properly formed if present
 * @param query
 */
const validateParams = (query: VercelRequestQuery) => {
    const { includeDockerignore, url } = query;
    if (
        includeDockerignore &&
        (typeof includeDockerignore !== "string" ||
            !["true", "false"].includes(includeDockerignore))
    ) {
        throw new Error(
            "Invalid 'includeDockerignore' parameter provided.  Only 'true' or 'false' are allowed"
        );
    }

    /**
     * This should be the last check of the function - if the user hasn't
     * provided a URL at all, then we assume they want to use the default
     */
    if (!url) return;
    const repoDetails = extractRepoDetails(url.toString());
    if (!repoDetails) throw new Error("Invalid 'url' param provided");
};
