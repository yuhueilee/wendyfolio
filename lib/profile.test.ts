import { getProfile } from "./profile";
import { profileSchema } from "./profile-schema";
import { toSiteProfile } from "./site-profile";

describe("profile data source", () => {
    it("loads and validates the canonical YAML profile", () => {
        const profile = getProfile();

        expect(profile.schemaVersion).toBe(1);
        expect(profile.experience).toHaveLength(3);
        expect(profile.projects).toHaveLength(5);
    });

    it("rejects invalid profile fields", () => {
        const profile = getProfile();
        const result = profileSchema.safeParse({
            ...profile,
            person: { ...profile.person, email: "not-an-email" },
        });

        expect(result.success).toBe(false);
    });

    it("exposes only website-selected entries to the portfolio", () => {
        const profile = getProfile();
        const siteProfile = toSiteProfile(profile);

        expect(siteProfile.jobs).toHaveLength(
            profile.experience.filter((job) =>
                job.channels.includes("website")
            ).length
        );
        expect(siteProfile.projects).toHaveLength(
            profile.projects.filter((project) =>
                project.channels.includes("website")
            ).length
        );
    });
});
