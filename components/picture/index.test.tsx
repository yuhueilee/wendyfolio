import { render } from "@testing-library/react";

import Picture from "./index";

describe("Picture", () => {
    it("prefers AVIF, falls back to WebP, then JPEG", () => {
        const { container } = render(
            <Picture
                src={{
                    avif: "https://cdn.example.com/image.avif",
                    webp: "https://cdn.example.com/image.webp",
                    jpg: "https://cdn.example.com/image.jpg",
                }}
                alt="Example"
            />
        );

        const sources = container.querySelectorAll("source");
        const image = container.querySelector("img");

        expect(sources).toHaveLength(2);
        expect(sources[0]).toHaveAttribute("type", "image/avif");
        expect(sources[0]).toHaveAttribute(
            "srcset",
            "https://cdn.example.com/image.avif"
        );
        expect(sources[1]).toHaveAttribute("type", "image/webp");
        expect(sources[1]).toHaveAttribute(
            "srcset",
            "https://cdn.example.com/image.webp"
        );
        expect(image).toHaveAttribute(
            "src",
            "https://cdn.example.com/image.jpg"
        );
        expect(image).toHaveAttribute("alt", "Example");
    });
});
