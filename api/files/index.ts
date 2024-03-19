import type { VercelRequest, VercelResponse } from "@vercel/node";
import { octoFetch } from "../../src/app/utils/api.js";
import { extractRepoDetails } from "../../src/app/utils/validation.js";

const defaultUrl = process.env.NEXT_PUBLIC_SAMPLE_GITHUB_REPO;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const repoUrl = req.query["url"] ?? defaultUrl;

    const repoDetails = extractRepoDetails(repoUrl as string);

    if (!repoDetails) {
        return res.status(400).json({ error: "Invalid URL" });
    }

    const { owner, repository, tree } = repoDetails;

    try {
        const resp = await octoFetch(
            `GET /repos/${owner}/${repository}/git/trees/${tree}?recursive=true`
        );

        return res.status(200).json({
            files: resp.data.tree.map((file: any) => file.path),
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Internal server error" });
    }
}
