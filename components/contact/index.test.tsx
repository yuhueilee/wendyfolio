import { render, screen } from "@testing-library/react";

import { getSiteProfile } from "../../lib/site-profile";
import Contact from "./index";

const profile = getSiteProfile();

const renderContact = () =>
    render(
        <Contact
            email={profile.email}
            githubHref={profile.githubHref}
            linkedinHref={profile.linkedinHref}
            name={profile.name}
            year={profile.year}
        />
    );

describe("correctly returns the contact component", () => {
    it("renders the email, GitHub and LinkedIn cards", () => {
        renderContact();

        expect(screen.getByText(profile.email).closest("a")).toHaveAttribute(
            "href",
            `mailto:${profile.email}`
        );
        expect(
            screen.getByText("github.com/yuhueilee").closest("a")
        ).toHaveAttribute("href", profile.githubHref);
        expect(
            screen.getByText("linkedin.com/in/yuhueilee-wendy").closest("a")
        ).toHaveAttribute("href", profile.linkedinHref);
    });

    it("renders the footer with the year and back-to-top link", () => {
        renderContact();

        expect(
            screen.getByText(`© ${profile.year} ${profile.name.toUpperCase()}`)
        ).toBeInTheDocument();
        expect(screen.getByText("BACK TO TOP ↑")).toHaveAttribute(
            "href",
            "#"
        );
    });
});
