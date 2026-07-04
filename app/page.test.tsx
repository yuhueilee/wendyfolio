import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("correctly returns the home page", () => {
    it("renders every section of the page", () => {
        const { container } = render(<Home />);

        ["hero", "about", "experience", "work", "contact"].forEach((id) => {
            expect(container.querySelector(`#${id}`)).toBeInTheDocument();
        });
        expect(
            screen.getByRole("heading", { level: 1, name: "Wendy Lee" })
        ).toBeInTheDocument();
    });
});
