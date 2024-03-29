import { TextArea, TextAreaProps } from "./TextArea";

const defaults: TextAreaProps = {
    label: "test",
    testId: "test",
};

describe("<TextArea />", () => {
    it("mounts", () => {
        cy.mount(<TextArea {...defaults} />);
    });

    context("visuals", () => {
        beforeEach(() => {
            cy.mount(<TextArea {...defaults} />);
        });

        it("displays the correct label", () => {
            cy.get("label").should("have.text", defaults.label);

            cy.get("label").should(
                "have.attr",
                "for",
                defaults.label.toLowerCase()
            );
        });

        it("should be referenced by testId", () => {
            cy.get(`[data-cy=${defaults.testId}]`).should("exist");
        });
    });

    context("functionality", () => {
        it("should not be disabled by default", () => {
            cy.mount(<TextArea {...defaults} />)
                .get("textarea")
                .should("not.be.disabled");
        });

        it("accepts a value", () => {
            const value = "test value";
            cy.mount(<TextArea {...defaults} value={value} />)
                .get("textarea")
                .should("have.value", value);
        });
    });
});
