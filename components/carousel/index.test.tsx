import { fireEvent, render, screen, within } from "@testing-library/react";

import Carousel from "./index";

describe("correctly returns the carousel component", () => {
    it("renders looping autoplay video without native controls", () => {
        const { container } = render(
            <Carousel
                title="Demo"
                shots={[{ mp4: "https://cdn.example.com/demo.mp4" }]}
            />
        );

        const video = screen.getByLabelText("Demo · video 01");
        const source = container.querySelector('source[type="video/mp4"]');

        expect(video).toHaveAttribute("autoplay");
        expect(video).toHaveAttribute("loop");
        expect(video).not.toHaveAttribute("controls");
        expect(source).toHaveAttribute(
            "src",
            "https://cdn.example.com/demo.mp4"
        );
        expect(
            screen.queryByLabelText("View Demo · shot 01")
        ).not.toBeInTheDocument();
        expect(screen.queryByLabelText("Previous")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("Next")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("Go to slide")).not.toBeInTheDocument();
    });

    it("opens video media in the full-screen lightbox", () => {
        render(
            <Carousel
                title="Demo"
                shots={[{ mp4: "https://cdn.example.com/demo.mp4" }]}
            />
        );

        fireEvent.click(screen.getByLabelText("Demo · video 01"));

        const dialog = screen.getByRole("dialog", { name: "Demo gallery" });
        expect(
            within(dialog).getByLabelText("Demo · video 01")
        ).toBeInTheDocument();
        expect(
            within(dialog).getByLabelText("Go to shot 1")
        ).toBeInTheDocument();
        expect(
            within(dialog).getByText("Demo", { selector: "p" })
        ).toBeInTheDocument();
        expect(
            within(dialog).getByLabelText("Demo · video 01")
        ).toHaveClass("object-contain");
        const thumbnail = within(dialog).getByLabelText("Go to shot 1");
        expect(thumbnail.querySelector("svg")).toBeInTheDocument();
        expect(thumbnail.querySelector("video")).not.toBeInTheDocument();
    });

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

    it("enables pinch zoom for image slides", () => {
        const { container } = render(
            <Carousel
                title="Demo"
                shots={[
                    {
                        avif: "demo.avif",
                        webp: "demo.webp",
                        jpg: "demo.jpg",
                    },
                ]}
            />
        );

        expect(
            container.querySelector(".swiper-zoom-container")
        ).toBeInTheDocument();
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
            within(dialog).getByText("Demo", { selector: "p" })
        ).toBeInTheDocument();
        expect(within(dialog).getByText("2 / 3")).toBeInTheDocument();
    });

    it("keeps pinch zoom while omitting visible zoom controls", () => {
        const dialog = openLightbox();

        expect(
            within(dialog).queryByLabelText("Zoom in")
        ).not.toBeInTheDocument();
        expect(
            within(dialog).queryByLabelText("Zoom out")
        ).not.toBeInTheDocument();
        expect(within(dialog).queryByLabelText("Zoom")).not.toBeInTheDocument();
        expect(within(dialog).getByLabelText("Previous")).toBeInTheDocument();
        expect(within(dialog).getByLabelText("Next")).toBeInTheDocument();
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

    it("closes when swiped down beyond the dismiss threshold", () => {
        const dialog = openLightbox();

        fireEvent.touchStart(dialog, {
            touches: [{ clientX: 120, clientY: 100 }],
        });
        fireEvent.touchMove(dialog, {
            touches: [{ clientX: 125, clientY: 220 }],
        });
        fireEvent.touchEnd(dialog, { touches: [] });

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("stays open after a short downward swipe", () => {
        const dialog = openLightbox();

        fireEvent.touchStart(dialog, {
            touches: [{ clientX: 120, clientY: 100 }],
        });
        fireEvent.touchMove(dialog, {
            touches: [{ clientX: 120, clientY: 160 }],
        });
        fireEvent.touchEnd(dialog, { touches: [] });

        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
});
