import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/carlito/latin-400.css";
import "@fontsource/carlito/latin-400-italic.css";
import "@fontsource/carlito/latin-700.css";
import { BsOpenai } from "react-icons/bs";
import {
    SiClaude,
    SiJavascript,
    SiPython,
    SiReact,
} from "react-icons/si";

import { getResumeProfile } from "../../lib/resume-profile";
import styles from "./resume.module.css";

export const metadata: Metadata = {
    title: "Yu Huei Lee - Resume",
    robots: { index: false, follow: false },
};

const EMPHASIS = [
    "With 4 years of hands-on software engineering experience",
    "efficiency, effective communication, and teamwork",
    "cut migration time by 50%",
    "migrating from a legacy HOC pattern to a React Context-based architecture",
    "eliminating UI coupling and jQuery state management",
    "decreased the app's bundled size by 31% for iOS and 16% for Android",
    "reduced duplicated business logic",
    "CI/CD workflow with fastlane and GitHub Actions",
    "resolved technical debt",
    "first place in a company hackathon",
    "cutting the operational time of manual replies from minutes to seconds",
];

const escapePattern = (value: string): string =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const EMPHASIS_PATTERN = new RegExp(
    `(${EMPHASIS.map(escapePattern).join("|")})`,
    "g"
);

const SKILL_ICONS: Record<string, ReactNode> = {
    React: <SiReact />,
    JavaScript: <SiJavascript />,
    Python: <SiPython />,
    Claude: <SiClaude />,
    OpenAI: <BsOpenai />,
};

const emphasize = (text: string): Array<ReactNode> =>
    text.split(EMPHASIS_PATTERN).map((part, index) =>
        EMPHASIS.includes(part) ? (
            <strong key={`${part}-${index}`}>{part}</strong>
        ) : (
            part
        )
    );

const displayUrl = (href: string): string =>
    href.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

const formatIssued = (value: string): string =>
    new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(`${value}-01T00:00:00Z`));

const SidebarSection = ({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) => (
    <section className={styles.sidebarSection}>
        <h2>{title}</h2>
        {children}
    </section>
);

export default function ResumePage() {
    const profile = getResumeProfile();
    const nameParts = profile.name.split(" ");
    const surname = nameParts.pop();

    return (
        <main className={styles.viewport}>
            <article className={styles.page}>
                <div className={styles.mainColumn}>
                    <header className={styles.introduction}>
                        <h1>
                            <span>{nameParts.join(" ")}</span> {surname}{" "}
                            <small>({profile.preferredName})</small>
                        </h1>
                        <p>{emphasize(profile.summary)}</p>
                    </header>

                    <section className={styles.experience}>
                        <h2>Job Experience</h2>
                        {profile.experience.map((job) => (
                            <section className={styles.job} key={job.id}>
                                <div className={styles.jobHeading}>
                                    <h3>{job.role}</h3>
                                    <span>·</span>
                                    <span className={styles.company}>
                                        {job.company}, {job.location}
                                    </span>
                                    <time>{job.duration}</time>
                                </div>
                                <p className={styles.technologies}>
                                    {job.technologies.join(" / ")}
                                </p>
                                <ul>
                                    {job.highlights.map((highlight) => (
                                        <li key={highlight}>
                                            {emphasize(highlight)}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </section>
                </div>

                <aside className={styles.sidebar}>
                    <SidebarSection title="Contact">
                        <address className={styles.contact}>
                            <a href={`mailto:${profile.contact.email}`}>
                                {profile.contact.email}
                            </a>
                            <a href={profile.contact.linkedin}>
                                {displayUrl(profile.contact.linkedin)}
                            </a>
                            <a href={profile.contact.github}>
                                {displayUrl(profile.contact.github)}
                            </a>
                            <a href={profile.contact.website}>
                                {displayUrl(profile.contact.website)}
                            </a>
                        </address>
                    </SidebarSection>

                    <SidebarSection title="Education">
                        {profile.education.map((item) => (
                            <div className={styles.sidebarItem} key={item.id}>
                                <h3>{item.institution}</h3>
                                <p>{item.degree}</p>
                                <p>{item.specialization}</p>
                                <p className={styles.muted}>
                                    {item.start} - {item.end} ・ {item.grade}
                                </p>
                            </div>
                        ))}
                    </SidebarSection>

                    <SidebarSection title="Skills">
                        <div className={styles.skills}>
                            {profile.skills.map((skill) => (
                                <span
                                    className={styles.skill}
                                    data-skill={skill.toLowerCase()}
                                    key={skill}
                                    title={skill}
                                    aria-label={skill}
                                    role="img"
                                >
                                    {SKILL_ICONS[skill]}
                                </span>
                            ))}
                        </div>
                    </SidebarSection>

                    <SidebarSection title="Certificates">
                        {profile.certifications.map((item) => (
                            <div className={styles.sidebarItem} key={item.id}>
                                <h3>{item.name}</h3>
                                <p className={styles.muted}>
                                    {formatIssued(item.issued)}
                                </p>
                            </div>
                        ))}
                    </SidebarSection>

                    <SidebarSection title="Side Projects">
                        {profile.projects.map((project) => (
                            <div className={styles.project} key={project.id}>
                                <h3>
                                    {project.href ? (
                                        <a href={project.href}>
                                            {project.title}
                                        </a>
                                    ) : (
                                        project.title
                                    )}
                                </h3>
                                <p>{emphasize(project.description)}</p>
                            </div>
                        ))}
                    </SidebarSection>

                    <SidebarSection title="Activities">
                        {profile.activities.map((activity) => (
                            <div className={styles.sidebarItem} key={activity.id}>
                                <h3>
                                    {activity.name}{" "}
                                    <span className={styles.activityLocation}>
                                        {activity.location}
                                    </span>
                                </h3>
                                <p>{activity.description}</p>
                            </div>
                        ))}
                    </SidebarSection>
                </aside>
            </article>
        </main>
    );
}
