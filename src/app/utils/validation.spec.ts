import { extractRepoDetails } from "./validation";
import { expect } from "chai";

describe("validation utilities", () => {
    context("invalid github tree", () => {
        it("returns undefined when URL is invalid", () => {
            expect(extractRepoDetails("")).to.eq(undefined);
        });

        it("throws an error when URL is missing parts", () => {
            expect(() => extractRepoDetails(null!)).to.throw(
                "Cannot read properties of null (reading 'match')"
            );
        });
    });

    context("valid github tree", () => {
        it("https, www", () => {
            const url = "https://www.github.com/owner/repo/tree/main";
            const details = extractRepoDetails(url);

            expect(details).to.deep.eq({
                owner: "owner",
                repository: "repo",
                tree: "main",
            });
        });

        it("http, www", () => {
            const url = "http://www.github.com/owner/repo/tree/main";
            const details = extractRepoDetails(url);

            expect(details).to.deep.eq({
                owner: "owner",
                repository: "repo",
                tree: "main",
            });
        });

        it("only https", () => {
            const url = "https://github.com/owner/repo/tree/main";
            const details = extractRepoDetails(url);

            expect(details).to.deep.eq({
                owner: "owner",
                repository: "repo",
                tree: "main",
            });
        });

        it("only http", () => {
            const url = "http://github.com/owner/repo/tree/main";
            const details = extractRepoDetails(url);

            expect(details).to.deep.eq({
                owner: "owner",
                repository: "repo",
                tree: "main",
            });
        });

        it("only www", () => {
            const url = "www.github.com/owner/repo/tree/main";
            const details = extractRepoDetails(url);

            expect(details).to.deep.eq({
                owner: "owner",
                repository: "repo",
                tree: "main",
            });
        });

        it("no http/s, no www", () => {
            const url = "github.com/owner/repo/tree/main";
            const details = extractRepoDetails(url);

            expect(details).to.deep.eq({
                owner: "owner",
                repository: "repo",
                tree: "main",
            });
        });

        it("allows commit URLs", () => {
            const url =
                "github.com/owner/repo/commit/bdb6650ebc73566a09482521a43b457270b3c44a";
            const details = extractRepoDetails(url);

            expect(details).to.deep.eq({
                owner: "owner",
                repository: "repo",
                tree: "bdb6650ebc73566a09482521a43b457270b3c44a",
            });
        });

        it("allows tag URLs", () => {
            const url = "github.com/owner/repo/releases/tag/v4.2.8";
            const details = extractRepoDetails(url);

            expect(details).to.deep.eq({
                owner: "owner",
                repository: "repo",
                tree: "v4.2.8",
            });
        });
    });
});
