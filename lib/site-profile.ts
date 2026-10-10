import "server-only";

import type { Job, MediaSource, PictureSource, Project } from "../types";
import { getProfile } from "./profile";
import type { Profile } from "./profile-schema";

export interface SiteProfile {
    name: string;
    preferredName: string;
    heroIntroduction: string;
    aboutIntroduction: string;
    seoDescription: string;
    email: string;
    githubHref: string;
    linkedinHref: string;
    resumeHref: string;
    year: string;
    profileImage: PictureSource;
    jobs: Array<Job>;
    projects: Array<Project>;
}

const formatMonth = (value: string): string =>
    new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    })
        .format(new Date(`${value}-01T00:00:00Z`))
        .toUpperCase();

const assetUrl = (baseUrl: string, path: string): string =>
    `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

const pictureSource = (baseUrl: string, path: string): PictureSource => ({
    avif: assetUrl(baseUrl, `${path}.avif`),
    webp: assetUrl(baseUrl, `${path}.webp`),
    jpg: assetUrl(baseUrl, `${path}.jpg`),
});

const projectMedia = (
    baseUrl: string,
    media: Profile["projects"][number]["media"]
): Array<MediaSource> =>
    media.flatMap<MediaSource>((item) => {
        if (item.type === "video") {
            return [{ mp4: assetUrl(baseUrl, item.path) }];
        }

        return Array.from({ length: item.count }, (_, index) =>
            pictureSource(baseUrl, `${item.path}/${index + 1}`)
        );
    });

export const toSiteProfile = (profile: Profile): SiteProfile => {
    const websiteExperience = profile.experience.filter((job) =>
        job.channels.includes("website")
    );
    const websiteProjects = profile.projects.filter((project) =>
        project.channels.includes("website")
    );

    return {
        name: profile.person.name.display,
        preferredName: profile.person.name.preferred,
        heroIntroduction: profile.introductions.hero,
        aboutIntroduction: profile.introductions.about,
        seoDescription: profile.introductions.seo,
        email: profile.person.email,
        githubHref: profile.person.profiles.github,
        linkedinHref: profile.person.profiles.linkedin,
        resumeHref: `/${profile.assets.resume.outputPath.replace(
            /^public\//,
            ""
        )}`,
        year: profile.lastUpdated.slice(0, 4),
        profileImage: pictureSource(
            profile.assets.baseUrl,
            profile.assets.profileImage.path
        ),
        jobs: websiteExperience.map((job) => ({
            duration: `${formatMonth(job.start)} — ${
                job.end ? formatMonth(job.end) : "PRESENT"
            }`,
            title: job.role,
            org: `@ ${job.company}`,
            stack: job.technologies,
            points: job.highlights
                .filter(
                    (highlight) =>
                        !highlight.channels ||
                        highlight.channels.includes("website")
                )
                .map((highlight) => highlight.text),
        })),
        projects: websiteProjects.map((project) => ({
            kind: project.kind.toUpperCase(),
            title: project.title,
            description: project.description,
            stack: project.technologies,
            links: [
                ...(project.links.demo
                    ? [
                          {
                              label: "LIVE DEMO",
                              href: project.links.demo,
                          },
                      ]
                    : []),
                ...(project.links.source
                    ? [
                          {
                              label: "GITHUB",
                              href: project.links.source,
                          },
                      ]
                    : []),
            ],
            shots: projectMedia(profile.assets.baseUrl, project.media),
        })),
    };
};

export const getSiteProfile = (): SiteProfile => toSiteProfile(getProfile());
