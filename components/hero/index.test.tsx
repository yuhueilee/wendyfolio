import { render, screen } from "@testing-library/react";

import { RESUME_HREF } from "../data";
import Hero from "./index";

describe("correctly returns the hero component", () => {
    it("renders the name, motto and lede", () => {
        render(<Hero />);

        expect(
            screen.getByRole("heading", { level: 1, name: "Wendy Lee" })
        ).toBeInTheDocument();
        expect(
            screen.getByText("Never stop learning and improving.")
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Software engineer working across the stack/)
        ).toBeInTheDocument();
    });

    it("renders the call-to-action links", () => {
        render(<Hero />);

        expect(screen.getByText(/DOWNLOAD RÉSUMÉ/)).toHaveAttribute(
            "href",
            RESUME_HREF
        );
        expect(screen.getByText(/VIEW WORK/)).toHaveAttribute(
            "href",
            "#work"
        );
    });
});
