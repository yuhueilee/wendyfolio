import { render, screen } from "@testing-library/react";

import About from "./index";

describe("correctly returns the about component", () => {
    it("renders the section title, photo and caption", () => {
        render(<About />);

        expect(screen.getByText("ABOUT ME")).toBeInTheDocument();
        expect(screen.getByAltText("Wendy Lee")).toBeInTheDocument();
        expect(screen.getByText("WENDY · LEE YU HUEI")).toBeInTheDocument();
    });

    it("renders the introduction paragraphs", () => {
        render(<About />);

        expect(
            screen.getByText(/studied Computer Science at Monash University/)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/At foodpanda Taiwan I built and maintained/)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/frontend\s+intern at Wavelet\s+Solutions/)
        ).toBeInTheDocument();
    });
});
