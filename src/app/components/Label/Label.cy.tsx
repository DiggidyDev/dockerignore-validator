import { Label, LabelProps } from "./Label";

const defaults: LabelProps = {
    htmlFor: "test-for",
    text: "test",
};

describe("<Label />", () => {
    it("mounts", () => {
        cy.mount(<Label {...defaults} />);
    });

    it("displays the correct text", () => {
        cy.mount(<Label {...defaults} />)
            .get("label")
            .should("have.text", defaults.text);
    });

    it("has the correct htmlFor", () => {
        cy.mount(<Label {...defaults} />)
            .get("label")
            .should("have.attr", "for", defaults.htmlFor);
    });

    it("accepts a custom className", () => {
        const className = "test-class";
        cy.mount(<Label {...defaults} className={className} />)
            .get("label")
            .should("have.class", className);
    });
});
