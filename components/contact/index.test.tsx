import { render, screen } from "@testing-library/react";

import { EMAIL, GITHUB_HREF, LINKEDIN_HREF, YEAR } from "../data";
import Contact from "./index";

describe("correctly returns the contact component", () => {
    it("renders the email, GitHub and LinkedIn cards", () => {
        render(<Contact />);

        expect(screen.getByText(EMAIL).closest("a")).toHaveAttribute(
            "href",
            `mailto:${EMAIL}`
        );
        expect(
            screen.getByText("github.com/yuhueilee").closest("a")
        ).toHaveAttribute("href", GITHUB_HREF);
        expect(
            screen.getByText("linkedin.com/in/yuhueilee-wendy").closest("a")
        ).toHaveAttribute("href", LINKEDIN_HREF);
    });

    it("renders the footer with the year and back-to-top link", () => {
        render(<Contact />);

        expect(screen.getByText(`© ${YEAR} WENDY LEE`)).toBeInTheDocument();
        expect(screen.getByText("BACK TO TOP ↑")).toHaveAttribute(
            "href",
            "#"
        );
    });
});
