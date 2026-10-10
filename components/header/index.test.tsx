import { render, screen } from "@testing-library/react";

import { getSiteProfile } from "../../lib/site-profile";
import Header from "./index";

const profile = getSiteProfile();

describe("correctly returns the header component", () => {
    it("renders the wordmark and anchor navigation", () => {
        render(
            <Header
                wordmark={profile.preferredName}
                resumeHref={profile.resumeHref}
            />
        );

        expect(screen.getByText("Wendy")).toBeInTheDocument();
        expect(screen.getByText("ABOUT")).toHaveAttribute("href", "#about");
        expect(screen.getByText("JOBS")).toHaveAttribute(
            "href",
            "#experience"
        );
        expect(screen.getByText("WORK")).toHaveAttribute("href", "#work");
        expect(screen.getByText("CONTACT")).toHaveAttribute(
            "href",
            "#contact"
        );
    });

    it("renders the resume download link", () => {
        render(
            <Header
                wordmark={profile.preferredName}
                resumeHref={profile.resumeHref}
            />
        );

        expect(screen.getByText("RESUME").closest("a")).toHaveAttribute(
            "href",
            profile.resumeHref
        );
    });
});
