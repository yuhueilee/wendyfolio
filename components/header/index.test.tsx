import { render, screen } from "@testing-library/react";

import { RESUME_HREF } from "../data";
import Header from "./index";

describe("correctly returns the header component", () => {
    it("renders the monogram and anchor navigation", () => {
        render(<Header />);

        expect(screen.getByText("WL")).toBeInTheDocument();
        expect(screen.getByText("ABOUT")).toHaveAttribute("href", "#about");
        expect(screen.getByText("JOBS")).toHaveAttribute(
            "href",
            "#experience"
        );
        expect(screen.getByText("WORK")).toHaveAttribute("href", "#work");
        expect(screen.getByText("CONTACT")).toHaveAttribute(
            "href",
            "#contact"
        );
    });

    it("renders both résumé download links", () => {
        render(<Header />);

        expect(screen.getByText(/RÉSUMÉ/)).toHaveAttribute(
            "href",
            RESUME_HREF
        );
        expect(
            screen.getByLabelText("Download résumé")
        ).toHaveAttribute("href", RESUME_HREF);
    });
});
