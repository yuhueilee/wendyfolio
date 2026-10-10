import "server-only";

import { getProfile } from "./profile";
import type { Profile } from "./profile-schema";

interface ResumeExperience {
    id: string;
    company: string;
    location: string;
    role: string;
    duration: string;
    technologies: Array<string>;
    highlights: Array<ResumeText>;
}

interface ResumeText {
    text: string;
    emphasis: Array<string>;
}

interface ResumeProject {
    id: string;
    title: string;
    description: ResumeText;
    href?: string;
}

export interface ResumeProfile {
    name: string;
    preferredName: string;
    summary: ResumeText;
    contact: {
        email: string;
        linkedin: string;
        github: string;
        website: string;
    };
    experience: Array<ResumeExperience>;
    education: Profile["education"];
    certifications: Profile["certifications"];
    projects: Array<ResumeProject>;
    activities: Profile["activities"];
    skills: Array<string>;
}

const formatMonth = (value: string): string =>
    new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(`${value}-01T00:00:00Z`));

const resumeEntries = <Entry extends { channels: Array<string> }>(
    entries: Array<Entry>
): Array<Entry> =>
    entries.filter((entry) => entry.channels.includes("resume"));

export const toResumeProfile = (profile: Profile): ResumeProfile => ({
    name: profile.person.name.resume,
    preferredName: profile.person.name.preferred,
    summary: profile.introductions.resume,
    contact: {
        email: profile.person.email,
        linkedin: profile.person.profiles.linkedin,
        github: profile.person.profiles.github,
        website: profile.person.website,
    },
    experience: resumeEntries(profile.experience).map((job) => ({
        id: job.id,
        company: job.company,
        location: job.location,
        role: job.role,
        duration: `${formatMonth(job.start)} - ${
            job.end ? formatMonth(job.end) : "Present"
        }`,
        technologies:
            job.overrides?.resume.technologies ?? job.technologies,
        highlights: job.highlights
            .filter(
                (highlight) =>
                    !highlight.channels ||
                    highlight.channels.includes("resume")
            )
            .map((highlight) => ({
                text: highlight.text,
                emphasis: highlight.emphasis,
            })),
    })),
    education: resumeEntries(profile.education),
    certifications: resumeEntries(profile.certifications),
    projects: resumeEntries(profile.projects).map((project) => ({
        id: project.id,
        title: project.title,
        description: {
            text:
                project.overrides?.resume.description ?? project.description,
            emphasis: project.overrides?.resume.emphasis ?? [],
        },
        href: project.links.demo,
    })),
    activities: resumeEntries(profile.activities),
    skills: profile.skills.featured,
});

export const getResumeProfile = (): ResumeProfile =>
    toResumeProfile(getProfile());
