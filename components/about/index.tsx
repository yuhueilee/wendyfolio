import type { ReactNode } from "react";

import type { PictureSource } from "../../types";
import Picture from "../picture";
import SectionHead from "../section-head";

const PARAGRAPH =
    "m-0 text-[clamp(14.5px,2.4vw,16px)] leading-[1.75] text-body-dark";

const EMPHASIS = ["e2e tests", "CI/CD workflows", "AI agents"];
const EMPHASIS_PATTERN = new RegExp(`(${EMPHASIS.join("|")})`, "g");

const highlightedIntroduction = (introduction: string): Array<ReactNode> => {
    return introduction.split(EMPHASIS_PATTERN).map((part, index) =>
        EMPHASIS.includes(part) ? (
            <span
                className="font-semibold text-accent-dark"
                key={`${part}-${index}`}
            >
                {part}
            </span>
        ) : (
            <span key={index}>{part}</span>
        )
    );
};

const Waves = ({ position }: { position: string }) => (
    <svg
        aria-hidden
        viewBox="0 0 120 60"
        fill="none"
        className={`absolute z-[1] w-[clamp(96px,20vw,120px)] text-accent ${position}`}
    >
        {[10, 28, 46].map((y) => (
            <path
                d={`M4 ${y} q 8 -9 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0`}
                key={y}
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
            />
        ))}
    </svg>
);

interface AboutProps {
    name: string;
    introduction: string;
    profileImage: PictureSource;
}

const About = ({ name, introduction, profileImage }: AboutProps) => (
    <section
        id="about"
        className="mx-auto max-w-[880px] scroll-mt-[72px] px-[clamp(20px,5vw,40px)] py-[clamp(56px,12vw,96px)]"
    >
        <SectionHead title="ABOUT ME" />
        <div className="flex flex-row-reverse flex-wrap items-center gap-[clamp(28px,6vw,48px)]">
            <div className="mx-auto flex flex-none flex-col items-center gap-3.5">
                <div className="relative">
                    <Picture
                        src={profileImage}
                        alt={name}
                        className="block h-[clamp(270px,60vw,330px)] w-[clamp(270px,60vw,330px)] line object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                    <Waves position="-bottom-6 -left-8" />
                    <Waves position="-top-6 -right-8" />
                </div>
            </div>
            <div className="min-w-0 flex-[1_1_320px]">
                <p className={PARAGRAPH}>
                    {highlightedIntroduction(introduction)}
                </p>
            </div>
        </div>
    </section>
);

export default About;
