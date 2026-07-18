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

    it("uses a full-viewport horizontally scrolling track with side padding", () => {
        render(<Work />);

        const track = screen.getByLabelText("Selected work");
        expect(track).toHaveClass(
            "flex",
            "w-screen",
            "overflow-x-auto",
            "px-[clamp(20px,5vw,40px)]",
            "[scrollbar-width:none]",
            "[&::-webkit-scrollbar]:hidden"
        );
        expect(track).not.toHaveClass("wide:grid");
    });

    it("uses portrait cards with three-line descriptions", () => {
        render(<Work />);

        const cards = screen.getAllByRole("article");
        cards.forEach((card) => {
            expect(card).toHaveClass(
                "aspect-[3/4]",
                "max-w-[400px]",
                "flex-none"
            );
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
