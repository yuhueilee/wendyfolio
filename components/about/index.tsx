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
                    Hi, I&apos;m Wendy (Lee Yu Huei) — a software engineer who
                    likes working across the whole stack and learning whatever
                    the problem demands. I studied Computer Science at Monash
                    University, graduating with a 3.8 GPA and a focus on
                    advanced programming, then took that curiosity straight
                    into industry.
                </p>
                <p className={`${PARAGRAPH} mt-4`}>
                    At foodpanda Taiwan I built and maintained the backend
                    services behind the subscription product, working closely
                    with client engineers, product managers, analysts, and
                    designers to ship features on time. I care about the
                    unglamorous parts that make software trustworthy: rigorous
                    staging tests, at least 70% coverage on key flows, and
                    production issues traced through Datadog and AWS and
                    resolved within hours — not days.
                </p>
                <p className={`${PARAGRAPH} mt-4`}>
                    Before that, I built responsive e-commerce interfaces with
                    Ionic and Angular as a frontend intern at Wavelet
                    Solutions — an early lesson in how much UI details shape a
                    user&apos;s trust. Outside of work I tinker with side
                    projects like Penguin Battle, a turn-based board game on
                    React and boardgame.io. My motto hasn&apos;t changed since
                    university: never stop learning and improving.
                </p>
            </div>
        </div>
    </section>
);

export default About;
