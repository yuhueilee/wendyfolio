import { render, screen } from "@testing-library/react";

import SectionHead from "./index";

describe("correctly returns the section head component", () => {
    it("renders the given title as a heading", () => {
        render(<SectionHead title="ABOUT ME" />);

        expect(
            screen.getByRole("heading", { level: 2, name: "ABOUT ME" })
        ).toBeInTheDocument();
    });
});
