import { render, screen } from "@testing-library/react";

import { getSiteProfile } from "../../lib/site-profile";
import About from "./index";

const profile = getSiteProfile();

const renderAbout = () =>
    render(
        <About
            name={profile.name}
            introduction={profile.aboutIntroduction}
            profileImage={profile.profileImage}
        />
    );

describe("correctly returns the about component", () => {
    it("renders the section title and photo", () => {
        const { container } = renderAbout();

        expect(screen.getByText("ABOUT ME")).toBeInTheDocument();
        expect(screen.getByAltText("Wendy Lee")).toHaveAttribute(
            "src",
            "https://cdn.wendyfolio.com/profile/1.jpg"
        );
        expect(container.querySelector('source[type="image/avif"]')).toHaveAttribute(
            "srcset",
            "https://cdn.wendyfolio.com/profile/1.avif"
        );
        expect(container.querySelector('source[type="image/webp"]')).toHaveAttribute(
            "srcset",
            "https://cdn.wendyfolio.com/profile/1.webp"
        );
    });

    it("renders the introduction with highlighted skills", () => {
        renderAbout();

        expect(
            screen.getByText(
                /a software engineer with four years of\s+experience/
            )
        ).toBeInTheDocument();
        expect(screen.getByText("e2e tests")).toBeInTheDocument();
        expect(screen.getByText("CI/CD workflows")).toBeInTheDocument();
        expect(screen.getByText("AI agents")).toBeInTheDocument();
    });
});
