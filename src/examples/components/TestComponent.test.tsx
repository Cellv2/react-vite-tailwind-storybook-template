import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TestComponent } from "./TestComponent";

describe("TestComponent", () => {
    it("should render the static h1 value", () => {
        render(<TestComponent wordToAdd="" />);

        const match = screen.getByText("TestComponent", { selector: "h1" });
        expect(match).toBeInTheDocument();
    });

    it("should render the value passed in on the page", () => {
        const word = "thingymajig";
        render(<TestComponent wordToAdd={word} />);

        const match = screen.getByText(word);
        expect(match).toBeInTheDocument();
    });
});
