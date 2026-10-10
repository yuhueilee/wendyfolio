import { render, screen } from "@testing-library/react";

import { getSiteProfile } from "../../lib/site-profile";
import Hero from "./index";

const profile = getSiteProfile();

describe("correctly returns the hero component", () => {
    it("renders the greeting, name and lede", () => {
        render(
            <Hero
                name={profile.name}
                introduction={profile.heroIntroduction}
                resumeHref={profile.resumeHref}
            />
        );

        expect(screen.getByText("Hi, my name is")).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { level: 1, name: "Wendy Lee" })
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Adaptable software engineer with 4 years/)
        ).toBeInTheDocument();
    });

    it("renders the call-to-action links", () => {
        render(
            <Hero
                name={profile.name}
                introduction={profile.heroIntroduction}
                resumeHref={profile.resumeHref}
            />
        );

        expect(
            screen.getByText("DOWNLOAD RESUME").closest("a")
        ).toHaveAttribute("href", profile.resumeHref);
        expect(screen.getByText("VIEW WORK")).toHaveAttribute(
            "href",
            "#work"
        );
    });
});
