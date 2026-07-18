import { PROJECTS } from "../data";
import Carousel from "../carousel";
import { GitHubIcon, LinkIcon } from "../icons";
import SectionHead from "../section-head";

const Work = () => (
    <section
        id="work"
        className="mx-auto max-w-[880px] scroll-mt-[72px] px-[clamp(20px,5vw,40px)] py-[clamp(56px,12vw,96px)]"
    >
        <SectionHead title="SELECTED WORK" />

        <div className="flex flex-col gap-[clamp(18px,4vw,28px)]">
            {PROJECTS.map((project, i) => {
                const imageLeft = i % 2 === 1;
                return (
                    <article
                        className={`flex flex-col items-stretch overflow-hidde wide:gap-3 ${
                            imageLeft
                                ? "wide:flex-row"
                                : "wide:flex-row-reverse"
                        }`}
                        key={project.title}
                    >
                        <Carousel
                            title={project.title}
                            shots={project.shots}
                            imageLeft={imageLeft}
                        />

                        <div className="flex min-w-0 flex-1 flex-col p-[clamp(20px,4.5vw,26px)] wide:flex-[1_1_60%] border border-card-line bg-white">
                            <span className="font-mono text-[11px] tracking-[0.08em] text-muted">
                                {project.kind}
                            </span>
                            <h3 className="m-0 mt-3 font-sans text-[clamp(21px,4.6vw,25px)] font-normal leading-[1.12]">
                                {project.title}
                            </h3>
                            <p className="mb-[18px] mt-3 flex-1 text-[clamp(13.5px,3.4vw,14.5px)] leading-[1.65] text-body">
                                {project.description}
                            </p>
                            <div className="mb-[18px] flex flex-wrap gap-2">
                                {project.stack.map((tech) => (
                                    <span
                                        className="border border-line px-2.5 py-[5px] font-mono text-[11px] tracking-[0.03em] text-ink"
                                        key={tech}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            {project.links.length > 0 && (
                                <div className="flex flex-wrap gap-4 border-t border-tint pt-4">
                                    {project.links.map((link) => (
                                        <a
                                            href={link.href}
                                            key={link.label}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3.5 py-2 font-mono text-[11px] tracking-[0.06em] text-accent-dark no-underline transition-colors duration-[250ms] hover:bg-ink hover:text-white"
                                        >
                                            {link.label === "GITHUB" ? (
                                                <GitHubIcon size={13} />
                                            ) : (
                                                <LinkIcon size={13} />
                                            )}
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </article>
                );
            })}
        </div>
    </section>
);

export default Work;
