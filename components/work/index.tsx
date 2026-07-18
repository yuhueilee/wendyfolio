"use client";

import Masonry from "@mui/lab/Masonry";

import CardCarousel from "../carousel/card";
import { PROJECTS } from "../data";
import { GitHubIcon, LinkIcon } from "../icons";
import SectionHead from "../section-head";
import type { Project } from "../../types";

type WorkCardProps = {
    project: Project;
};

const MEDIA_RATIO_CLASS: Record<Project["ratio"], string> = {
    "3:4": "aspect-[3/4]",
    "4:3": "aspect-[4/3]",
};

const WorkCard = ({ project }: WorkCardProps) => (
    <article className="overflow-hidden rounded-[22px] bg-white">
        <div
            className={`${MEDIA_RATIO_CLASS[project.ratio]} overflow-hidden rounded-[22px] p-2`}
        >
            <CardCarousel title={project.title} shots={project.shots} />
        </div>
        <div className="px-4 pb-5 pt-4">
            <span className="inline-flex rounded-full bg-tint px-2.5 py-1 font-mono text-[9px] tracking-[0.08em] text-accent-dark">
                {project.kind}
            </span>
            <h3 className="mb-0 mt-2 text-[20px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
                {project.title}
            </h3>
            <p className="mb-0 mt-3 font-[Arial,sans-serif] text-[13px] leading-5 text-body">
                {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                    <span
                        className="rounded-full bg-tint px-2.5 py-1 font-mono text-[9px] leading-[13px] text-body-dark"
                        key={tech}
                    >
                        {tech}
                    </span>
                ))}
            </div>
            {project.links.length > 0 && (
                <div className="mt-4 flex gap-2">
                    {project.links.map((link) => (
                        <a
                            href={link.href}
                            key={link.label}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-3 py-2.5 font-mono text-[9px] font-medium tracking-[0.05em] text-white no-underline transition-colors hover:bg-accent-dark"
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
    </article>
);

const Work = () => (
    <section
        id="work"
        className="mx-auto max-w-[980px] scroll-mt-[72px] px-[clamp(20px,5vw,40px)] py-[clamp(56px,12vw,96px)]"
    >
        <SectionHead title="SELECTED WORK" />

        <div className="flex w-full justify-center">
            <Masonry
                aria-label="Selected work"
                columns={{ xs: 1, md: 2 }}
                defaultColumns={1}
                defaultHeight={1800}
                defaultSpacing={2.5}
                spacing={2.5}
                sx={{ margin: "0 auto", width: "100%" }}
            >
                {PROJECTS.map((project) => (
                    <WorkCard key={project.title} project={project} />
                ))}
            </Masonry>
        </div>
    </section>
);

export default Work;
