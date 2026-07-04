"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import "./index.scss";

type Project = {
    year: string;
    title: string;
    role: string;
    summary: string;
    detail: string;
    stack: string[];
    highlights: string[];
};

const RESUME_HREF = "/assets/YuHuei-Lee-Resume.pdf";
const LINKEDIN_HREF = "https://www.linkedin.com/in/yuhuei-lee";
const EMAIL = "yuhuei.lee@example.com";
const SHOTS = 3;
const YEAR = "2026";

const PROJECTS: Project[] = [
    {
        year: "2025",
        title: "Realtime Sync Engine",
        role: "BACKEND LEAD",
        summary:
            "A conflict-free sync layer keeping mobile clients and the cloud consistent under flaky connectivity.",
        detail:
            "Designed and led delivery of an event-sourced sync service that reconciles offline edits across thousands of field devices. Owned the data model, the CRDT merge strategy, and the rollout to production.",
        stack: ["Go", "AWS Lambda", "DynamoDB", "SQS", "gRPC"],
        highlights: [
            "Cut sync conflicts by 94% with a CRDT-based merge model.",
            "Sustained 12k writes/sec on a serverless footprint.",
            "Mentored two engineers through the service rollout.",
        ],
    },
    {
        year: "2024",
        title: "Field Ops Mobile App",
        role: "MOBILE ENGINEER",
        summary:
            "An offline-first React Native app used daily by on-site technicians to log and dispatch work.",
        detail:
            "Rebuilt the field operations app from a sluggish hybrid shell into a fast, offline-capable React Native product. Introduced a typed data layer and an optimistic UI that made the app feel instant even with no signal.",
        stack: ["React Native", "TypeScript", "SQLite", "Reanimated"],
        highlights: [
            "Reduced cold-start time from 4.2s to 1.1s.",
            "Shipped offline-first flows with optimistic updates.",
            "Raised crash-free sessions to 99.7%.",
        ],
    },
    {
        year: "2023",
        title: "Customer Web Platform",
        role: "FULL-STACK ENGINEER",
        summary:
            "The self-serve web platform where customers manage accounts, billing, and usage in one place.",
        detail:
            "Worked end-to-end across a React/TypeScript frontend and Go services to consolidate three legacy portals into a single platform. Built the component library and the billing integration that the rest of the team built on.",
        stack: ["React", "TypeScript", "Go", "PostgreSQL"],
        highlights: [
            "Unified three legacy portals into one platform.",
            "Authored a 40-component internal design system.",
            "Trimmed page-load weight by 38%.",
        ],
    },
    {
        year: "2022",
        title: "Internal Tooling & CI",
        role: "PLATFORM ENGINEER",
        summary:
            "Developer tooling and pipelines that shortened the path from commit to production.",
        detail:
            "Built CLI tooling and reusable CI workflows that standardised how every team tested, built, and deployed. Removed flaky manual steps and gave engineers fast, reliable feedback.",
        stack: ["Go", "GitHub Actions", "Docker", "AWS ECS"],
        highlights: [
            "Brought average deploy time from 22min to 6min.",
            "Standardised CI across 14 repositories.",
            "Eliminated the top three sources of pipeline flakiness.",
        ],
    },
    {
        year: "2021",
        title: "Notifications Service",
        role: "BACKEND ENGINEER · FIRST ROLE",
        summary:
            "A multi-channel notifications service handling email, push, and in-app delivery at scale.",
        detail:
            "My first production service: a queue-backed notifications system with templating, rate-limiting, and delivery tracking. Learned the fundamentals of resilient backend design under real load.",
        stack: ["Go", "Redis", "AWS SNS", "PostgreSQL"],
        highlights: [
            "Delivered 2M+ notifications per day reliably.",
            "Added per-tenant rate-limiting and retries.",
            "Built delivery tracking with full audit trails.",
        ],
    },
];

const LinkedInIcon = ({ size, fill }: { size: number; fill: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.1c0-1.22-.02-2.8-1.9-2.8-1.9 0-2.2 1.35-2.2 2.7V21h-4z" />
    </svg>
);

const DownloadIcon = ({ size }: { size: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 3v12" />
        <path d="M7 11l5 4 5-4" />
        <path d="M5 20h14" />
    </svg>
);

const Portfolio = () => {
    const [tab, setTab] = useState<"work" | "info">("work");
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [slides, setSlides] = useState<Record<number, number>>({});
    const [narrow, setNarrow] = useState(false);

    const carouselRefs = useRef<Array<HTMLDivElement | null>>([]);
    const timelineRef = useRef<HTMLDivElement | null>(null);
    const fillRef = useRef<HTMLDivElement | null>(null);

    const updateFill = useCallback(() => {
        const wrap = timelineRef.current;
        const fill = fillRef.current;
        if (!wrap || !fill) return;
        const r = wrap.getBoundingClientRect();
        const mid = window.innerHeight * 0.5;
        const prog = Math.max(0, Math.min(1, (mid - r.top) / r.height));
        fill.style.height = prog * 100 + "%";
    }, []);

    useEffect(() => {
        const onResize = () => setNarrow(window.innerWidth < 600);
        onResize();
        window.addEventListener("resize", onResize, { passive: true });
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        if (tab !== "work") return;
        updateFill();
        let n = 0;
        const poll = setInterval(() => {
            updateFill();
            if (++n > 20) clearInterval(poll);
        }, 150);
        const onScroll = () => updateFill();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            clearInterval(poll);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [tab, openIndex, updateFill]);

    const changeTab = (next: "work" | "info") => {
        if (next === tab) return;
        setTab(next);
        window.scrollTo({ top: 0, behavior: "auto" });
    };

    const toggle = (i: number) =>
        setOpenIndex((prev) => (prev === i ? null : i));

    const goTo = (i: number, j: number) => {
        const c = carouselRefs.current[i];
        if (c) c.scrollTo({ left: j * c.clientWidth, behavior: "smooth" });
    };

    const nudge = (i: number, dir: number) => {
        const c = carouselRefs.current[i];
        if (c) c.scrollBy({ left: dir * c.clientWidth, behavior: "smooth" });
    };

    const handleScroll = (i: number, e: React.UIEvent<HTMLDivElement>) => {
        const c = e.currentTarget;
        if (!c.clientWidth) return;
        const idx = Math.round(c.scrollLeft / c.clientWidth);
        setSlides((prev) =>
            prev[i] === idx ? prev : { ...prev, [i]: idx }
        );
    };

    const countLabel = ("0" + PROJECTS.length).slice(-2);

    return (
        <div className="portfolio">
            {/* floating header */}
            <header className="pf-header">
                {!narrow && <div className="pf-monogram">YL</div>}

                <nav className="pf-tabs">
                    <button
                        type="button"
                        className={`pf-tab${tab === "work" ? " is-active" : ""}`}
                        onClick={() => changeTab("work")}
                    >
                        WORK
                    </button>
                    <button
                        type="button"
                        className={`pf-tab${tab === "info" ? " is-active" : ""}`}
                        onClick={() => changeTab("info")}
                    >
                        INFO
                    </button>
                </nav>

                <div className="pf-actions">
                    <a
                        href={LINKEDIN_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="pf-iconBtn"
                    >
                        <LinkedInIcon size={17} fill="currentColor" />
                    </a>
                    {narrow ? (
                        <a
                            href={RESUME_HREF}
                            download
                            aria-label="Download résumé"
                            title="Download résumé"
                            className="pf-iconBtn"
                        >
                            <DownloadIcon size={17} />
                        </a>
                    ) : (
                        <a href={RESUME_HREF} download className="pf-resumeBtn">
                            RÉSUMÉ&nbsp;↓
                        </a>
                    )}
                </div>
            </header>

            {tab === "work" && (
                <>
                    {/* HERO */}
                    <section className="pf-hero">
                        <p className="pf-eyebrow">
                            SOFTWARE ENGINEER &nbsp;·&nbsp; PORTFOLIO 2026
                        </p>
                        <h1 className="pf-title">YuHuei Lee</h1>
                        <p className="pf-lede">
                            Adaptable software engineer with four years of
                            hands-on experience spanning the full stack — backend
                            in Go &amp; AWS, mobile in React Native, and web in
                            React &amp; TypeScript. Quick to learn, eager to step
                            outside the comfort zone, and driven to build the
                            tools and systems that make teams move faster.
                        </p>
                        <div className="pf-ctaRow">
                            <a
                                href={RESUME_HREF}
                                download
                                className="pf-ctaPrimary"
                            >
                                DOWNLOAD RÉSUMÉ&nbsp; ↓
                            </a>
                            <a href="#work" className="pf-ctaGhost">
                                VIEW WORK&nbsp; ↓
                            </a>
                        </div>
                    </section>

                    {/* WORK */}
                    <section id="work" className="pf-work">
                        <div className="pf-sectionHead">
                            <h2 className="pf-sectionTitle">SELECTED WORK</h2>
                            <span className="pf-count">[ {countLabel} ]</span>
                        </div>

                        <div className="pf-timeline" ref={timelineRef}>
                            <div className="pf-rail" />
                            <div className="pf-fill" ref={fillRef} />

                            {PROJECTS.map((project, i) => {
                                const isOpen = openIndex === i;
                                const active = slides[i] || 0;
                                return (
                                    <div className="pf-item" key={project.title}>
                                        <div className="pf-dot" />

                                        <div
                                            className="pf-itemHead"
                                            onClick={() => toggle(i)}
                                        >
                                            <div className="pf-year">
                                                {project.year}
                                            </div>
                                            <div className="pf-itemTop">
                                                <div>
                                                    <h3 className="pf-itemTitle">
                                                        {project.title}
                                                    </h3>
                                                    <p className="pf-role">
                                                        {project.role}
                                                    </p>
                                                </div>
                                                <span
                                                    className="pf-toggle"
                                                    style={{
                                                        transform: isOpen
                                                            ? "rotate(45deg)"
                                                            : "rotate(0deg)",
                                                    }}
                                                >
                                                    +
                                                </span>
                                            </div>
                                            <p className="pf-summary">
                                                {project.summary}
                                            </p>
                                        </div>

                                        <div
                                            className="pf-detail"
                                            style={{
                                                overflow: "hidden",
                                                maxHeight: isOpen
                                                    ? "1600px"
                                                    : "0px",
                                                opacity: isOpen ? 1 : 0,
                                                marginTop: isOpen
                                                    ? "24px"
                                                    : "0px",
                                                transition:
                                                    "max-height 0.65s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease, margin-top 0.5s ease",
                                            }}
                                        >
                                            <div className="pf-carousel">
                                                <div
                                                    className="pf-shots"
                                                    ref={(el) => {
                                                        carouselRefs.current[i] =
                                                            el;
                                                    }}
                                                    onScroll={(e) =>
                                                        handleScroll(i, e)
                                                    }
                                                >
                                                    {Array.from({
                                                        length: SHOTS,
                                                    }).map((_, j) => (
                                                        <div
                                                            className="pf-shot"
                                                            key={j}
                                                        >
                                                            <div className="pf-slot">
                                                                Drop screenshot ·
                                                                0{j + 1}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => nudge(i, -1)}
                                                    aria-label="Previous"
                                                    className="pf-navBtn pf-prev"
                                                >
                                                    ‹
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => nudge(i, 1)}
                                                    aria-label="Next"
                                                    className="pf-navBtn pf-next"
                                                >
                                                    ›
                                                </button>
                                                <div className="pf-dots">
                                                    {Array.from({
                                                        length: SHOTS,
                                                    }).map((_, j) => (
                                                        <button
                                                            type="button"
                                                            key={j}
                                                            onClick={() =>
                                                                goTo(i, j)
                                                            }
                                                            aria-label="Go to slide"
                                                            className="pf-dotBtn"
                                                            style={{
                                                                width:
                                                                    j === active
                                                                        ? "20px"
                                                                        : "7px",
                                                                background:
                                                                    j === active
                                                                        ? "#0a0a0a"
                                                                        : "#d4d4d4",
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="pf-detailText">
                                                {project.detail}
                                            </p>
                                            <div className="pf-metaLabel">
                                                STACK
                                            </div>
                                            <div className="pf-stack">
                                                {project.stack.map((tech) => (
                                                    <span
                                                        className="pf-tech"
                                                        key={tech}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="pf-metaLabel">
                                                HIGHLIGHTS
                                            </div>
                                            <ul className="pf-highlights">
                                                {project.highlights.map(
                                                    (point) => (
                                                        <li
                                                            className="pf-highlight"
                                                            key={point}
                                                        >
                                                            {point}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* CONTACT */}
                    <section id="contact" className="pf-contact">
                        <div className="pf-contactInner">
                            <p className="pf-contactEyebrow">GET IN TOUCH</p>
                            <h2 className="pf-contactTitle">
                                Let&apos;s build something that lasts.
                            </h2>

                            <div className="pf-contactList">
                                <div className="pf-contactCards">
                                    <a
                                        href={`mailto:${EMAIL}`}
                                        className="pf-contactCard"
                                    >
                                        <span className="pf-contactIcon">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#ffffff"
                                                strokeWidth={1.5}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <rect
                                                    x="2.5"
                                                    y="4.5"
                                                    width="19"
                                                    height="15"
                                                    rx="1.5"
                                                />
                                                <path d="M3 6l9 6 9-6" />
                                            </svg>
                                        </span>
                                        <span className="pf-contactMeta">
                                            <span className="pf-contactLabel">
                                                EMAIL
                                            </span>
                                            <span className="pf-contactValue">
                                                {EMAIL}
                                            </span>
                                        </span>
                                        <span className="pf-contactArrow">
                                            ↗
                                        </span>
                                    </a>
                                    <a
                                        href={LINKEDIN_HREF}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pf-contactCard"
                                    >
                                        <span className="pf-contactIcon">
                                            <LinkedInIcon
                                                size={19}
                                                fill="#ffffff"
                                            />
                                        </span>
                                        <span className="pf-contactMeta">
                                            <span className="pf-contactLabel">
                                                LINKEDIN
                                            </span>
                                            <span className="pf-contactValue">
                                                linkedin.com/in/yuhuei-lee
                                            </span>
                                        </span>
                                        <span className="pf-contactArrow">
                                            ↗
                                        </span>
                                    </a>
                                </div>
                                <p className="pf-contactNote">
                                    Open to full-stack &amp; backend roles —
                                    contract or full-time.
                                </p>
                            </div>

                            <div className="pf-footer">
                                <span>© {YEAR} YUHUEI LEE</span>
                                <a href="#" className="pf-backTop">
                                    BACK TO TOP ↑
                                </a>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {tab === "info" && (
                <section className="pf-leisure">
                    <p className="pf-eyebrow">OFF THE CLOCK</p>
                    <h1 className="pf-leisureTitle">Away from the keyboard.</h1>
                    <p className="pf-leisureLede">
                        The things that keep me curious when I&apos;m not
                        shipping code — analog hobbies, long distances, and a
                        standing excuse to be outside.
                    </p>

                    <div className="pf-masonry">
                        <figure className="pf-figure">
                            <div
                                className="pf-slot"
                                style={{ height: "360px" }}
                            >
                                Film photography
                            </div>
                            <figcaption className="pf-figcap">
                                <span className="pf-figTitle">
                                    Film photography
                                </span>
                                <span className="pf-figTag">35MM</span>
                            </figcaption>
                        </figure>

                        <div className="pf-quote">
                            <p>
                                &ldquo;The best debugging happens at 3,000 feet,
                                halfway up a trail.&rdquo;
                            </p>
                        </div>

                        <figure className="pf-figure">
                            <div
                                className="pf-slot"
                                style={{ height: "240px" }}
                            >
                                Trail running
                            </div>
                            <figcaption className="pf-figcap">
                                <span className="pf-figTitle">
                                    Trail running
                                </span>
                                <span className="pf-figTag">42KM</span>
                            </figcaption>
                        </figure>

                        <div className="pf-note">
                            <div className="pf-noteLabel">CERAMICS</div>
                            <p className="pf-noteText">
                                Throwing mugs that are almost symmetrical.
                                Learning that patience is a physical skill.
                            </p>
                        </div>

                        <figure className="pf-figure">
                            <div
                                className="pf-slot"
                                style={{ height: "300px" }}
                            >
                                Cooking
                            </div>
                            <figcaption className="pf-figcap">
                                <span className="pf-figTitle">
                                    Slow cooking
                                </span>
                                <span className="pf-figTag">SUN</span>
                            </figcaption>
                        </figure>

                        <figure className="pf-figure">
                            <div
                                className="pf-slot"
                                style={{ height: "200px" }}
                            >
                                Travel
                            </div>
                            <figcaption className="pf-figcap">
                                <span className="pf-figTitle">
                                    Travel sketching
                                </span>
                                <span className="pf-figTag">12 CITIES</span>
                            </figcaption>
                        </figure>

                        <div className="pf-note">
                            <div className="pf-noteLabel">VINYL</div>
                            <p className="pf-noteText">
                                A slowly growing crate of jazz and post-rock. The
                                ritual of side B is the point.
                            </p>
                        </div>

                        <figure className="pf-figure">
                            <div
                                className="pf-slot"
                                style={{ height: "330px" }}
                            >
                                Cycling
                            </div>
                            <figcaption className="pf-figcap">
                                <span className="pf-figTitle">
                                    Weekend cycling
                                </span>
                                <span className="pf-figTag">DAWN</span>
                            </figcaption>
                        </figure>

                        <div className="pf-note">
                            <div className="pf-noteLabel">READING</div>
                            <p className="pf-noteText">
                                Mostly sci-fi and the occasional systems-design
                                book. Currently three bookmarks deep in one
                                novel.
                            </p>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Portfolio;
