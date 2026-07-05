import profileImg from "../../public/images/profile-pic.jpeg";
import SectionHead from "../section-head";

const PARAGRAPH =
    "m-0 text-[clamp(14.5px,2.4vw,16px)] leading-[1.75] text-body-dark";

const About = () => (
    <section
        id="about"
        className="mx-auto max-w-[880px] scroll-mt-[72px] px-[clamp(20px,5vw,40px)] py-[clamp(56px,12vw,96px)]"
    >
        <SectionHead title="ABOUT ME" />
        <div className="flex flex-row-reverse flex-wrap items-center gap-[clamp(28px,6vw,48px)]">
            <div className="mx-auto flex flex-none flex-col items-center gap-3.5">
                <img
                    src={profileImg.src}
                    alt="Wendy Lee"
                    className="block h-[clamp(180px,40vw,220px)] w-[clamp(180px,40vw,220px)] rounded-full border border-line object-cover"
                />
                <span className="font-mono text-[10px] tracking-[0.14em] text-muted">
                    WENDY · LEE YU HUEI
                </span>
            </div>
            <div className="min-w-0 flex-[1_1_320px]">
                <p className={PARAGRAPH}>
                    Hi, I'm Wendy — a software engineer with four years of
                    experience. My journey has taken me from backend to
                    frontend: building subscription features for a food delivery
                    app while conducting{" "}
                    <span className="font-semibold text-accent">e2e tests</span> covering key
                    user flows, modernizing an e-commerce platform's React
                    Native app with TypeScript and{" "}
                    <span className="font-semibold text-accent">CI/CD workflows</span>, and
                    now working at the intersection of React and AI tooling —
                    building <span className="font-semibold text-accent">AI agents</span> that
                    speed up package migrations and automate repetitive
                    engineering work. What ties it all together? I love stepping
                    outside my comfort zone and building tools that help teams
                    move faster.
                </p>
            </div>
        </div>
    </section>
);

export default About;
