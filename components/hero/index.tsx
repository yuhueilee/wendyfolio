import { RESUME_HREF } from "../data";

const Hero = () => (
    <section id="hero" className="bg-gradient-to-b from-tint to-mist">
        <div className="mx-auto max-w-[880px] px-[clamp(20px,5vw,40px)] pb-[clamp(64px,14vw,110px)] pt-[clamp(110px,22vw,170px)]">
            <p className="m-0 mb-[clamp(20px,5vw,28px)] font-mono text-xs tracking-[0.16em] text-muted">
                SOFTWARE ENGINEER &nbsp;·&nbsp; PORTFOLIO 2026
            </p>
            <h1 className="m-0 font-sans text-[clamp(44px,12vw,80px)] font-normal leading-[0.98] tracking-[-0.02em]">
                Wendy Lee
            </h1>
            <p className="m-0 mt-[clamp(16px,3.5vw,22px)] font-sans text-[clamp(19px,3.4vw,26px)] font-light italic leading-[1.4] text-accent">
                Never stop learning and improving.
            </p>
            <p className="m-0 mt-[clamp(18px,4vw,26px)] max-w-[600px] text-[clamp(15px,2.4vw,17px)] leading-[1.65] text-body">
                Software engineer working across the stack — backend services
                in production at scale, responsive frontends, and the tests
                and tooling that keep both trustworthy.
            </p>
            <div className="mt-[clamp(30px,7vw,42px)] flex flex-wrap gap-3.5">
                <a
                    href={RESUME_HREF}
                    download
                    className="inline-flex items-center gap-2.5 border border-accent bg-accent px-[26px] py-[15px] font-mono text-xs tracking-[0.08em] text-mist no-underline transition-colors duration-[250ms] hover:bg-accent-dark"
                >
                    DOWNLOAD RÉSUMÉ&nbsp; ↓
                </a>
                <a
                    href="#work"
                    className="inline-flex items-center border border-line bg-transparent px-[26px] py-[15px] font-mono text-xs tracking-[0.08em] text-ink no-underline transition-colors duration-[250ms] hover:border-ink"
                >
                    VIEW WORK&nbsp; ↓
                </a>
            </div>
        </div>
    </section>
);

export default Hero;
