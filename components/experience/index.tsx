"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { JOBS } from "../data";
import SectionHead from "../section-head";

const companyName = (org: string) => org.replace(/^@\s*/, "");

const Experience = () => {
    const [active, setActive] = useState(0);
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const vBarRef = useRef<HTMLSpanElement | null>(null);
    const hBarRef = useRef<HTMLSpanElement | null>(null);

    const moveIndicator = useCallback(() => {
        const tab = tabRefs.current[active];
        if (!tab) return;
        const vBar = vBarRef.current;
        const hBar = hBarRef.current;
        if (vBar) {
            vBar.style.transform = `translateY(${tab.offsetTop}px)`;
            vBar.style.height = `${tab.offsetHeight}px`;
        }
        if (hBar) {
            hBar.style.transform = `translateX(${tab.offsetLeft}px)`;
            hBar.style.width = `${tab.offsetWidth}px`;
        }
    }, [active]);

    useEffect(() => {
        moveIndicator();
        let n = 0;
        const poll = setInterval(() => {
            moveIndicator();
            if (++n > 10) clearInterval(poll);
        }, 200);
        window.addEventListener("resize", moveIndicator, { passive: true });
        return () => {
            clearInterval(poll);
            window.removeEventListener("resize", moveIndicator);
        };
    }, [moveIndicator]);

    const job = JOBS[active];

    return (
        <section id="experience" className="scroll-mt-[72px] bg-tint">
            <div className="mx-auto max-w-[880px] px-[clamp(20px,5vw,40px)] py-[clamp(56px,12vw,96px)]">
                <SectionHead
                    title="JOB EXPERIENCE"
                    spacing="mb-[clamp(36px,8vw,52px)]"
                />

                <div className="flex flex-col gap-7 md:flex-row md:items-start md:gap-[clamp(32px,5vw,56px)]">
                    <div className="-mx-[clamp(20px,5vw,40px)] overflow-x-auto px-[clamp(20px,5vw,40px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:w-[200px] md:flex-none md:overflow-visible md:px-0">
                        <div
                            className="relative flex w-fit flex-row md:w-auto md:flex-col"
                            role="tablist"
                            aria-label="Companies"
                        >
                            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-line md:hidden" />
                            <span className="absolute inset-y-0 left-0 hidden w-[2px] bg-line md:block" />
                            <span
                                className="absolute bottom-0 left-0 h-[2px] bg-accent transition-[transform,width] duration-300 ease-out md:hidden"
                                ref={hBarRef}
                            />
                            <span
                                className="absolute left-0 top-0 hidden w-[2px] bg-accent transition-[transform,height] duration-300 ease-out md:block"
                                ref={vBarRef}
                            />
                            {JOBS.map((j, i) => (
                                <button
                                    className={`flex-none cursor-pointer border-0 bg-transparent px-4 py-3 text-left font-mono text-xs tracking-[0.08em] transition-colors duration-[250ms] md:px-5 ${
                                        active === i
                                            ? "text-accent"
                                            : "text-muted hover:text-ink"
                                    }`}
                                    key={j.org}
                                    onClick={() => setActive(i)}
                                    ref={(el) => {
                                        tabRefs.current[i] = el;
                                    }}
                                    role="tab"
                                    aria-selected={active === i}
                                    type="button"
                                >
                                    {companyName(j.org)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div
                        className="min-w-0 flex-1 animate-fade-up md:min-h-[280px]"
                        key={job.org}
                        role="tabpanel"
                    >
                        <h3 className="m-0 font-sans text-[clamp(20px,4.6vw,25px)] font-normal leading-[1.15]">
                            {job.title}{" "}
                            <span className="text-accent">{job.org}</span>
                        </h3>
                        <div className="mt-2 flex flex-col gap-2">
                            <span className="font-mono text-[11px] tracking-[0.08em] text-muted">
                                {job.duration}
                            </span>
                            <span className="font-mono text-[11px] tracking-[0.08em] text-accent">
                                {job.stack.join(" / ")}
                            </span>
                        </div>
                        <ul className="m-0 mt-2 flex list-none flex-col gap-2 p-0">
                            {job.points.map((point) => (
                                <li
                                    className="relative max-w-[620px] pl-5 text-[clamp(13.5px,3.4vw,14.5px)] leading-[1.6] text-body before:absolute before:left-0 before:top-0 before:text-accent before:content-['—']"
                                    key={point}
                                >
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
