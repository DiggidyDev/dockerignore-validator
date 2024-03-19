import { request } from "@octokit/request";

export const octoFetch = request.defaults({
    headers: {
        authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
});
