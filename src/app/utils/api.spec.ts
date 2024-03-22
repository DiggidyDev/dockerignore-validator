import { getGithubRepo, processFiles, stringifyOptions } from "./api";
import { expect } from "chai";
import sinon from "sinon";

describe("api utilities", () => {
    context("URL search params", () => {
        it("stringifies options", () => {
            const options = { includeDockerignore: true, url: "" };
            const result = stringifyOptions(options);

            expect(result.toString()).to.eq("includeDockerignore=true");
        });
    });

    context("fetching github repo", () => {
        afterEach(() => {
            sinon.restore();
        });

        it("throws an error when URL is invalid", async () => {
            const url = "invalid-url";

            try {
                await getGithubRepo(url);
            } catch (e: any) {
                expect(e.message).to.eq("Invalid URL");
            }
        });

        it("throws an error when response is not ok", async () => {
            sinon.stub(global, "fetch").resolves({
                ok: false,
                statusText: "Not Found",
            } as Response);

            try {
                await getGithubRepo("");
            } catch (e: any) {
                expect(e.message).to.eq("Not Found");
            }
        });

        it("returns an object with files and dockerignore", async () => {
            sinon.stub(global, "fetch").resolves({
                ok: true,
                json: async () => ({
                    dockerignore: ["node_modules"],
                    files: ["src/index.ts"],
                }),
            } as Response);

            const url = "https://github.com/test/repo/tree/test";

            const r = await getGithubRepo(url);

            expect(r).to.deep.eq({
                dockerignore: ["node_modules"],
                files: ["src/index.ts"],
            });
        });
    });

    it("processes files correctly", () => {
        const files = "src/index.ts\nnode_modules\n";
        const result = [true, false];
        const showIgnored = true;

        const ignored = processFiles(files, result, showIgnored);
        expect(ignored).to.eq("src/index.ts");

        const copied = processFiles(files, result, !showIgnored);
        expect(copied).to.eq("node_modules");
    });
});
