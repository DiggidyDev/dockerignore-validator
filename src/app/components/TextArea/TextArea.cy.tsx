import { TextArea, TextAreaProps } from "./TextArea";

const defaults: TextAreaProps = {
    label: "test",
};

describe("<TextArea />", () => {
    it("mounts", () => {
        cy.mount(<TextArea {...defaults} />);
    });

    context("visuals", () => {
        it("displays the correct label", () => {
            cy.mount(<TextArea {...defaults} />)
                .get("label")
                .should("have.text", defaults.label);

            cy.get("label").should(
                "have.attr",
                "for",
                defaults.label.toLowerCase()
            );
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
