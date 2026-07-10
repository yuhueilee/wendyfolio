import { render, screen, within } from "@testing-library/react";

import { PROJECTS } from "../data";
import Work from "./index";

describe("correctly returns the work component", () => {
    it("renders every project with its description and stack", () => {
        render(<Work />);

        expect(screen.getByText("SELECTED WORK")).toBeInTheDocument();
        PROJECTS.forEach((project) => {
            expect(
                screen.getByRole("heading", { name: project.title })
            ).toBeInTheDocument();
            expect(
                screen.getByText(project.description)
            ).toBeInTheDocument();
            project.stack.forEach((tech) => {
                expect(screen.getAllByText(tech).length).toBeGreaterThan(0);
            });
        });
    });

    it("renders external project links", () => {
        render(<Work />);

        const cards = screen.getAllByRole("article");
        PROJECTS.forEach((project, i) => {
            project.links.forEach((link) => {
                const anchor = within(cards[i]).getByRole("link", {
                    name: link.label,
                });
                expect(anchor).toHaveAttribute("href", link.href);
                expect(anchor).toHaveAttribute("target", "_blank");
            });
        });
    });
});
