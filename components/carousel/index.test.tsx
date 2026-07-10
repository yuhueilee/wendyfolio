import { fireEvent, render, screen, within } from "@testing-library/react";

import Carousel from "./index";

describe("correctly returns the carousel component", () => {
    it("renders a placeholder slot for every missing shot", () => {
        render(<Carousel title="Demo" shots={[null, null, null]} />);

        expect(screen.getByText("Demo · shot 01")).toBeInTheDocument();
        expect(screen.getByText("Demo · shot 02")).toBeInTheDocument();
        expect(screen.getByText("Demo · shot 03")).toBeInTheDocument();
    });

    it("renders the shots inside a swiper track", () => {
        const { container } = render(
            <Carousel title="Demo" shots={[null, null, null]} />
        );

        expect(container.querySelector(".swiper")).toBeInTheDocument();
        expect(container.querySelectorAll(".swiper-slide")).toHaveLength(3);
    });

    it("renders navigation buttons and one dot per shot", () => {
        render(<Carousel title="Demo" shots={[null, null, null]} />);

        expect(screen.getByLabelText("Previous")).toBeInTheDocument();
        expect(screen.getByLabelText("Next")).toBeInTheDocument();
        expect(screen.getAllByLabelText("Go to slide")).toHaveLength(3);
    });

    it("marks the first dot as active initially", () => {
        render(<Carousel title="Demo" shots={[null, null, null]} />);

        const dots = screen.getAllByLabelText("Go to slide");
        expect(dots[0]).toHaveStyle({ width: "20px" });
        expect(dots[1]).toHaveStyle({ width: "7px" });
        fireEvent.click(dots[1]);
    });
});

describe("lightbox overlay", () => {
    const openLightbox = (shot = "View Demo · shot 01") => {
        render(<Carousel title="Demo" shots={[null, null, null]} />);
        fireEvent.click(screen.getByLabelText(shot));
        return screen.getByRole("dialog");
    };

    it("is closed until a slide is clicked", () => {
        render(<Carousel title="Demo" shots={[null, null, null]} />);

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("opens a modal with the clicked shot's caption at the bottom", () => {
        const dialog = openLightbox("View Demo · shot 02");

        expect(dialog).toHaveAttribute("aria-label", "Demo gallery");
        expect(
            within(dialog).getByText("Demo · shot 02", { selector: "p" })
        ).toBeInTheDocument();
        expect(within(dialog).getByText("2 / 3")).toBeInTheDocument();
    });

    it("renders zoom and navigation controls", () => {
        const dialog = openLightbox();

        expect(within(dialog).getByLabelText("Zoom in")).toBeInTheDocument();
        expect(within(dialog).getByLabelText("Zoom out")).toBeInTheDocument();
        expect(within(dialog).getByLabelText("Previous")).toBeInTheDocument();
        expect(within(dialog).getByLabelText("Next")).toBeInTheDocument();
    });

    it("renders a zoom slider ranging from 1x to 3x", () => {
        const dialog = openLightbox();

        const slider = within(dialog).getByLabelText("Zoom");
        expect(slider).toHaveAttribute("type", "range");
        expect(slider).toHaveAttribute("min", "1");
        expect(slider).toHaveAttribute("max", "3");
    });

    it("renders a thumbnail per shot with the clicked one marked current", () => {
        const dialog = openLightbox("View Demo · shot 02");

        const thumbs = within(dialog).getAllByLabelText(/Go to shot \d/);
        expect(thumbs).toHaveLength(3);
        expect(thumbs[1]).toHaveAttribute("aria-current", "true");
        expect(thumbs[0]).toHaveAttribute("aria-current", "false");
    });

    it("caps the thumbnail strip at 3 images", () => {
        render(
            <Carousel title="Demo" shots={[null, null, null, null, null]} />
        );
        fireEvent.click(screen.getByLabelText("View Demo · shot 04"));

        const dialog = screen.getByRole("dialog");
        expect(within(dialog).getAllByLabelText(/Go to shot \d/)).toHaveLength(
            3
        );
    });

    it("closes via the close button", () => {
        const dialog = openLightbox();

        fireEvent.click(within(dialog).getByLabelText("Close"));
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes when Escape is pressed", () => {
        openLightbox();

        fireEvent.keyDown(document, { key: "Escape" });
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
});
