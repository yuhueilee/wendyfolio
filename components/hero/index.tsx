import { RESUME_HREF } from "../data";
import { DownloadIcon } from "../icons";

const Hero = () => (
    <section id="hero" className="bg-gradient-to-b from-tint-deep to-mist">
        <div className="mx-auto max-w-[880px] px-[clamp(20px,5vw,40px)] pb-[clamp(64px,14vw,110px)] pt-[clamp(110px,22vw,170px)] md:pb-[72px] md:pt-[128px]">
            <p className="m-0 mb-[clamp(20px,5vw,28px)] font-mono text-sm tracking-[0.16em] text-muted">
                Hi, my name is
            </p>
            <h1 className="m-0 font-sans text-[clamp(44px,12vw,80px)] font-normal leading-[0.98] tracking-[-0.02em]">
                Wendy Lee
            </h1>
            <p className="m-0 mt-[clamp(18px,4vw,26px)] max-w-[600px] text-[clamp(15px,2.4vw,17px)] leading-[1.65] text-body">
                Adaptable software engineer with 4 years of experience across
                the full stack. A quick learner and dependable team player,
                driven to build tools and systems that help teams move faster.
            </p>
            <div className="mt-[clamp(30px,7vw,42px)] flex flex-wrap gap-3.5">
                <a
                    href={RESUME_HREF}
                    download
                    className="inline-flex items-center gap-2.5 border border-accent bg-accent px-[26px] py-[15px] font-mono text-xs tracking-[0.08em] text-mist no-underline transition-colors duration-[250ms] hover:bg-accent-dark"
                >
                    <span>DOWNLOAD RESUME</span>
                    <DownloadIcon size={17} />
                </a>
                <a
                    href="#work"
                    className="inline-flex items-center border border-line bg-transparent px-[26px] py-[15px] font-mono text-xs tracking-[0.08em] text-ink no-underline transition-colors duration-[250ms] hover:border-ink hover:bg-ink hover:text-white"
                >
                    VIEW WORK
                </a>
            </div>
        </div>
    </section>
);

export default Hero;
