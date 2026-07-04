"use client";

import { useCallback, useEffect, useRef } from "react";

import { JOBS } from "../data";
import SectionHead from "../section-head";

const Experience = () => {
    const timelineRef = useRef<HTMLDivElement | null>(null);
    const fillRef = useRef<HTMLDivElement | null>(null);

    const updateFill = useCallback(() => {
        const wrap = timelineRef.current;
        const fill = fillRef.current;
        if (!wrap || !fill) return;
        const r = wrap.getBoundingClientRect();
        if (!r.height) return;
        const mid = window.innerHeight * 0.55;
        const prog = Math.max(0, Math.min(1, (mid - r.top) / r.height));
        fill.style.height = prog * 100 + "%";
    }, []);

    useEffect(() => {
        updateFill();
        let n = 0;
        const poll = setInterval(() => {
            updateFill();
            if (++n > 20) clearInterval(poll);
        }, 200);
        const onScroll = () => updateFill();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            clearInterval(poll);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [updateFill]);

    return (
        <section id="experience" className="scroll-mt-[72px] bg-tint">
            <div className="mx-auto max-w-[880px] px-[clamp(20px,5vw,40px)] py-[clamp(56px,12vw,96px)]">
                <SectionHead
                    title="JOB EXPERIENCE"
                    spacing="mb-[clamp(36px,8vw,52px)]"
                />

                <div
                    className="relative pl-[clamp(28px,6vw,40px)]"
                    ref={timelineRef}
                >
                    <div className="absolute bottom-1 left-2 top-1 w-px bg-line" />
                    <div
                        className="absolute left-[7.5px] top-1 h-0 w-[2px] bg-accent transition-[height] duration-200 ease-linear"
                        ref={fillRef}
                    />

                    <div className="flex flex-col gap-[clamp(36px,8vw,52px)]">
                        {JOBS.map((job) => (
                            <div className="relative" key={job.title}>
                                <div className="absolute left-[calc(clamp(28px,6vw,40px)*-1_+_3px)] top-[5px] h-[11px] w-[11px] rounded-full border-2 border-accent bg-tint" />
                                <h3 className="m-0 font-sans text-[clamp(20px,4.6vw,25px)] font-normal leading-[1.15]">
                                    {job.title}{" "}
                                    <span className="text-accent">
                                        {job.org}
                                    </span>
                                </h3>
                                <div className="mt-2 flex flex-wrap items-center gap-2.5">
                                    <span className="font-mono text-[11px] tracking-[0.08em] text-muted">
                                        {job.duration}
                                    </span>
                                </div>
                                <ul className="m-0 mt-3.5 flex list-none flex-col gap-2 p-0">
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
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
