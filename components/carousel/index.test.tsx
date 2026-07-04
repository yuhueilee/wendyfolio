import { fireEvent, render, screen } from "@testing-library/react";

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
