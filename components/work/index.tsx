"use client";

import { useEffect, useRef, useState } from "react";

import CardCarousel from "../carousel/card";
import { PROJECTS } from "../data";
import { GitHubIcon, LinkIcon } from "../icons";
import SectionHead from "../section-head";
import type { Project } from "../../types";

const MASONRY_GAP = 20;
const DESCRIPTION_FONT = "400 11px Arial";
const DESCRIPTION_LINE_HEIGHT = 15;
const DESCRIPTION_MAX_LINES = 3;

type WorkCardProps = {
    project: Project;
    index: number;
};

const WorkCard = ({ project, index }: WorkCardProps) => {
    const cardRef = useRef<HTMLElement>(null);
    const [descriptionHeight, setDescriptionHeight] = useState(
        DESCRIPTION_LINE_HEIGHT * DESCRIPTION_MAX_LINES
    );

    useEffect(() => {
        if (process.env.NODE_ENV === "test") return;

        const card = cardRef.current;
        if (!card) return;

        let cancelled = false;
        let measureAtWidth: ((width: number) => void) | undefined;
        let latestWidth = card.clientWidth;

        void import("@chenglou/pretext").then(({ layout, prepare }) => {
            if (cancelled) return;

            const prepared = prepare(project.description, DESCRIPTION_FONT);
            measureAtWidth = (cardWidth: number) => {
                const textWidth = Math.max(1, cardWidth - 40);
                const measured = layout(
                    prepared,
                    textWidth,
                    DESCRIPTION_LINE_HEIGHT
                );
                setDescriptionHeight(
                    Math.min(
                        measured.height,
                        DESCRIPTION_LINE_HEIGHT * DESCRIPTION_MAX_LINES
                    )
                );
            };
            measureAtWidth(latestWidth);
        });

        const observer = new ResizeObserver(([entry]) => {
            latestWidth = entry.contentRect.width;
            measureAtWidth?.(latestWidth);
        });
        observer.observe(card);

        return () => {
            cancelled = true;
            observer.disconnect();
        };
    }, [project.description]);

    return (
        <article
            ref={cardRef}
            data-column={index % 2 === 0 ? "left" : "right"}
            className="mb-5 w-full self-start overflow-hidden rounded-[32px] shadow-[0_18px_38px_rgba(36,60,76,0.2)] transition-[transform,box-shadow] duration-300 wide:mb-0 wide:hover:-translate-y-1 wide:hover:shadow-[0_24px_48px_rgba(36,60,76,0.26)]"
            style={{
                height: `${project.height}px`,
                gridColumn: index % 2 === 0 ? 1 : 2,
                gridRowEnd: `span ${project.height + MASONRY_GAP}`,
            }}
        >
            <CardCarousel title={project.title} shots={project.shots}>
                {() => (
                    <div className="pointer-events-none absolute inset-0 z-[4] flex flex-col justify-end px-5 pb-5 text-white">
                        <span className="mb-1.5 w-fit rounded-full bg-white/15 px-2.5 py-1 font-mono text-[8px] tracking-[0.08em] backdrop-blur-md">
                            {project.kind}
                        </span>
                        <h3 className="m-0 text-[18px] font-semibold leading-[1.1] tracking-[-0.02em]">
                            {project.title}
                        </h3>
                        <p
                            className="mb-2 mt-1.5 overflow-hidden font-[Arial,sans-serif] text-[11px] leading-[15px] text-white/75 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]"
                            style={{ height: `${descriptionHeight}px` }}
                        >
                            {project.description}
                        </p>
                        <div className="mb-2 flex max-h-[22px] shrink-0 flex-wrap gap-1.5 overflow-hidden">
                            {project.stack.map((tech) => (
                                <span
                                    className="rounded-full bg-white/15 px-2 py-1 font-mono text-[8px] leading-[11px] tracking-[0.02em] backdrop-blur-md"
                                    key={tech}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        {project.links.length > 0 && (
                            <div
                                className="pointer-events-auto flex shrink-0 gap-2"
                                onClick={(event) => event.stopPropagation()}
                            >
                                {project.links.map((link) => (
                                    <a
                                        href={link.href}
                                        key={link.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-3 py-2.5 font-mono text-[9px] font-medium tracking-[0.05em] text-ink no-underline transition hover:bg-mist"
                                    >
                                        {link.label === "GITHUB" ? (
                                            <GitHubIcon size={12} />
                                        ) : (
                                            <LinkIcon size={12} />
                                        )}
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </CardCarousel>
        </article>
    );
};

const Work = () => (
    <section
        id="work"
        className="mx-auto max-w-[980px] scroll-mt-[72px] px-[clamp(20px,5vw,40px)] py-[clamp(56px,12vw,96px)]"
    >
        <SectionHead title="SELECTED WORK" />

        <div
            aria-label="Selected work"
            className="wide:grid wide:grid-cols-2 wide:gap-x-5 wide:[grid-auto-rows:1px]"
        >
            {PROJECTS.map((project, index) => (
                <WorkCard
                    key={project.title}
                    project={project}
                    index={index}
                />
            ))}
        </div>
    </section>
);

export default Work;
