import { fireEvent, render, screen, within } from "@testing-library/react";

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

    it("uses a responsive masonry layout without a scrolling track", () => {
        render(<Work />);

        const masonry = screen.getByLabelText("Selected work");
        expect(masonry).toHaveClass("wide:grid", "wide:grid-cols-2");
        expect(masonry).not.toHaveClass("overflow-x-auto");
    });

    it("places odd projects left and even projects right", () => {
        render(<Work />);

        const cards = screen.getAllByRole("article");
        expect(cards[0]).toHaveAttribute("data-column", "left");
        expect(cards[1]).toHaveAttribute("data-column", "right");
        expect(cards[2]).toHaveAttribute("data-column", "left");
        expect(cards[3]).toHaveAttribute("data-column", "right");
    });

    it("uses data-defined card heights with three-line descriptions", () => {
        render(<Work />);

        const cards = screen.getAllByRole("article");
        PROJECTS.forEach((project, index) => {
            expect(cards[index]).toHaveStyle({
                height: `${project.height}px`,
            });
        });

        const firstCard = cards[0];
        expect(within(firstCard).getByText(PROJECTS[0].description)).toHaveClass(
            "[-webkit-line-clamp:3]"
        );
    });

    it("opens video cards in the fullscreen modal without a project CTA", () => {
        render(<Work />);

        const firstCard = screen.getAllByRole("article")[0];
        expect(
            within(firstCard).queryByRole("button", { name: "VIEW PROJECT" })
        ).not.toBeInTheDocument();

        fireEvent.click(
            within(firstCard).getByLabelText(`${PROJECTS[0].title} · video 01`)
        );

        expect(
            screen.getByRole("dialog", {
                name: `${PROJECTS[0].title} gallery`,
            })
        ).toBeInTheDocument();
    });
});
