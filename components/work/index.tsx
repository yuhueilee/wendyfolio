"use client";

import CardCarousel from "../carousel/card";
import { PROJECTS } from "../data";
import { GitHubIcon, LinkIcon } from "../icons";
import SectionHead from "../section-head";
import type { Project } from "../../types";

type WorkCardProps = {
    project: Project;
};

const WorkCard = ({ project }: WorkCardProps) => (
    <article className="aspect-[3/4] w-[calc(100vw-40px)] max-w-[400px] flex-none cursor-pointer overflow-hidden rounded-[32px]">
        <CardCarousel title={project.title} shots={project.shots}>
            {() => (
                <div className="pointer-events-none absolute inset-0 z-[4] flex flex-col justify-end px-5 pb-5 text-white">
                    <span className="mb-1.5 w-fit rounded-full bg-white/15 px-2.5 py-1 font-mono text-[8px] tracking-[0.08em] backdrop-blur-md">
                        {project.kind}
                    </span>
                    <h3 className="m-0 text-[18px] font-semibold leading-[1.1] tracking-[-0.02em]">
                        {project.title}
                    </h3>
                    <p className="mb-2 mt-1.5 h-[45px] overflow-hidden font-[Arial,sans-serif] text-[11px] leading-[15px] text-white/75 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
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

const Work = () => (
    <section
        id="work"
        className="mx-auto max-w-[980px] scroll-mt-[72px] px-[clamp(20px,5vw,40px)] py-[clamp(56px,12vw,96px)]"
    >
        <SectionHead title="SELECTED WORK" />

        <div
            aria-label="Selected work"
            className="relative left-1/2 flex w-screen -translate-x-1/2 gap-5 overflow-x-auto px-[clamp(20px,5vw,40px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
            {PROJECTS.map((project) => (
                <WorkCard key={project.title} project={project} />
            ))}
        </div>
    </section>
);

export default Work;
