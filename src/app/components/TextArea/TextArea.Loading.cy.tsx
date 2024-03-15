import { TextArea } from "./TextArea";

describe("<TextArea.Loading />", () => {
    it("mounts", () => {
        cy.mount(<TextArea.Loading />);
    });

    context("visuals", () => {
        it("displays default label", () => {
            cy.mount(<TextArea.Loading />)
                .get("label")
                .should("have.text", "Loading...");
        });

        it("displays custom label", () => {
            const label = "Custom Loading...";
            cy.mount(<TextArea.Loading label={label} />)
                .get("label")
                .should("have.text", label);
        });
    });

    context("functionality", () => {
        it("is disabled", () => {
            cy.mount(<TextArea.Loading />)
                .get("textarea")
                .should("be.disabled");
        });
    });
});
