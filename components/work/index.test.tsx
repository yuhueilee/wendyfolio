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

    it("uses Material UI Masonry without a horizontal scrolling track", () => {
        render(<Work />);

        const masonry = screen.getByLabelText("Selected work");
        expect(masonry).toHaveClass("MuiMasonry-root");
        expect(masonry.parentElement).toHaveClass(
            "flex",
            "w-full",
            "justify-center"
        );
        expect(masonry).not.toHaveClass("overflow-x-auto");
    });

    it("places the complete project details below the media", () => {
        render(<Work />);

        const cards = screen.getAllByRole("article");
        cards.forEach((card, index) => {
            expect(card).toHaveClass("bg-white", "rounded-[12px]");
            expect(card.firstElementChild).toHaveClass(
                PROJECTS[index].ratio === "3:4"
                    ? "aspect-[3/4]"
                    : "aspect-[4/3]"
            );
        });

        const firstCard = cards[0];
        const description = within(firstCard).getByText(
            PROJECTS[0].description
        );
        expect(description).not.toHaveClass("[-webkit-line-clamp:3]");
        expect(description).not.toHaveClass("overflow-hidden");
        expect(firstCard.firstElementChild).not.toContainElement(description);
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
