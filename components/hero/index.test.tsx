import { render, screen } from "@testing-library/react";

import { RESUME_HREF } from "../data";
import Hero from "./index";

describe("correctly returns the hero component", () => {
    it("renders the greeting, name and lede", () => {
        render(<Hero />);

        expect(screen.getByText("Hi, my name is")).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { level: 1, name: "Wendy Lee" })
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Adaptable software engineer with 4 years/)
        ).toBeInTheDocument();
    });

    it("renders the call-to-action links", () => {
        render(<Hero />);

        expect(
            screen.getByText("DOWNLOAD RESUME").closest("a")
        ).toHaveAttribute("href", RESUME_HREF);
        expect(screen.getByText("VIEW WORK")).toHaveAttribute(
            "href",
            "#work"
        );
    });
});
