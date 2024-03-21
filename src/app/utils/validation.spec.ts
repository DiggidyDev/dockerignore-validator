import { extractRepoDetails } from "./validation";
import { expect } from "chai";

describe("validation utilities", () => {
    context("URL regex", () => {
        it("returns undefined when URL is invalid", () => {
            expect(extractRepoDetails("")).to.eq(undefined);
        });

        it("returns an object with owner, repository, and tree", () => {
            const url = "https://github.com/owner/repo/tree/main";
            const details = extractRepoDetails(url);

            expect(details).to.deep.eq({
                owner: "owner",
                repository: "repo",
                tree: "main",
            });
        });

        it("throws an error when URL is missing parts", () => {
            expect(() => extractRepoDetails(null!)).to.throw(
                "Cannot read properties of null (reading 'match')"
            );
        });
    });
});
