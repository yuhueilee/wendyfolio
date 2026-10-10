import { render, screen } from "@testing-library/react";

import ResumePage, { metadata } from "./page";

describe("resume page", () => {
    it("renders the one-page resume sections from profile data", () => {
        render(<ResumePage />);

        expect(
            screen.getByRole("heading", { level: 1, name: /Yu Huei Lee/ })
        ).toBeInTheDocument();
        expect(screen.getByText("Job Experience")).toBeInTheDocument();
        expect(screen.getByText("Education")).toBeInTheDocument();
        expect(screen.getByText("Side Projects")).toBeInTheDocument();
        expect(screen.getByText("Activities")).toBeInTheDocument();
        expect(screen.getByText("Online")).toHaveClass("activityLocation");
        expect(
            screen.getByText("React 16 to 18", { exact: false })
        ).toBeInTheDocument();
        expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
        expect(screen.getByRole("link", { name: "Replyo" })).toHaveAttribute(
            "href",
            "https://replyo-client.vercel.app/"
        );
        expect(
            screen.getByRole("link", { name: "Penguin Battle" })
        ).toHaveAttribute("href", "https://penguin-battle.netlify.app/");
        ["React", "JavaScript", "Python", "Claude", "OpenAI"].forEach(
            (skill) => {
                expect(
                    screen.getByRole("img", { name: skill })
                ).toBeInTheDocument();
            }
        );
    });

    it("keeps the print template out of search results", () => {
        expect(metadata.robots).toEqual({ index: false, follow: false });
    });
});
