import { render, screen } from "@testing-library/react";

import { RESUME_HREF } from "../data";
import Header from "./index";

describe("correctly returns the header component", () => {
    it("renders the wordmark and anchor navigation", () => {
        render(<Header />);

        expect(screen.getByText("Wendy")).toBeInTheDocument();
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

    it("renders the resume download link", () => {
        render(<Header />);

        expect(screen.getByText("RESUME").closest("a")).toHaveAttribute(
            "href",
            RESUME_HREF
        );
    });
});
