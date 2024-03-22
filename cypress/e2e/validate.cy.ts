describe("Homepage", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should have all inputs present and in the correct initial state", () => {
        // Test inputs are present and valid
        cy.get("[data-cy=dockerignore-input] > textarea")
            .should("exist")
            .and("be.enabled");
        cy.get("[data-cy=dockerignore-input] > label")
            .should("exist")
            .and("have.text", ".dockerignore");

        cy.get("[data-cy=files-input] > textarea")
            .should("exist")
            .and("be.enabled");
        cy.get("[data-cy=files-input] > label")
            .should("exist")
            .and("have.text", "Files");

        cy.get("[data-cy=options] > input[name=showIgnored]").should(
            "not.exist"
        );

        cy.get("[data-cy=toggle-options]").should("exist").and("be.enabled");

        cy.get("[data-cy=validate-button]").should("exist").and("be.enabled");

        // Test output is present and in the correct state
        cy.get("[data-cy=result-output] > textarea")
            .should("exist")
            .and("be.disabled");
        cy.get("[data-cy=result-output] > label")
            .should("exist")
            .and("have.text", "Ignored Files");
    });

    it("should allow form submission with correct ", () => {
        const dockerignore = "node_modules";
        const files = "node_modules\npackage.json";

        // Output text with "Show ignored files" checked
        const expectedIgnoredOutput = "node_modules";
        // Output text with "Show ignored files" unchecked
        const expectedCopyFilesOutput = "package.json";
        // API Response
        const expectedRes = [true, false];

        // Ensure the correct data is being sent and received
        cy.intercept("POST", "/api/validate", (req) => {
            expect(JSON.parse(req.body)).to.deep.equal({
                dockerignore: ["node_modules"],
                files: ["node_modules", "package.json"],
            });
            req.continue((res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.deep.equal(expectedRes);
            });
        }).as("validate");

        cy.get("[data-cy=dockerignore-input] > textarea").type(dockerignore);
        cy.get("[data-cy=files-input] > textarea").type(files);

        // Ensure the output is empty and the loading state is not present
        cy.get("[data-cy=result-output] > textarea").should("be.empty");
        cy.get("[data-cy=textarea-loading]").should("not.exist");

        // Once clicked, the result should be replaced with a loading state
        cy.get("[data-cy=validate-button]").click();
        cy.get("[data-cy=result-output]").should("not.exist");
        cy.get("[data-cy=textarea-loading]").should("exist");
        cy.get("[data-cy=textarea-loading] > label").should(
            "have.text",
            "Matching patterns..."
        );

        cy.wait("@validate");

        // Loading state should be removed and the result should be present
        cy.get("[data-cy=textarea-loading]").should("not.exist");
        cy.get("[data-cy=result-output]").should("exist");

        // Ensure the result has the correct output for both checked
        // and unchecked states of "Show ignored files"
        cy.get("[data-cy=result-output] > textarea").should(
            "have.text",
            expectedIgnoredOutput
        );

        cy.get("[data-cy=toggle-options]").click();
        cy.get("[data-cy=toggle-options]").should("have.text", "Hide Options");

        cy.get("[data-cy=options] > input[name=showIgnored]").uncheck();
        cy.get("[data-cy=result-output] > label").should(
            "have.text",
            "Files to Copy"
        );
        cy.get("[data-cy=result-output] > textarea").should(
            "have.text",
            expectedCopyFilesOutput
        );
    });
});
