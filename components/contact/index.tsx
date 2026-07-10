import { EMAIL, GITHUB_HREF, LINKEDIN_HREF, YEAR } from "../data";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../icons";

const CONTACT_CARDS = [
    {
        label: "EMAIL",
        value: EMAIL,
        href: `mailto:${EMAIL}`,
        external: false,
        icon: <MailIcon />,
    },
    {
        label: "GITHUB",
        value: "github.com/yuhueilee",
        href: GITHUB_HREF,
        external: true,
        icon: <GitHubIcon />,
    },
    {
        label: "LINKEDIN",
        value: "linkedin.com/in/yuhueilee-wendy",
        href: LINKEDIN_HREF,
        external: true,
        icon: <LinkedInIcon />,
    },
];

const Contact = () => (
    <section id="contact" className="scroll-mt-[60px] bg-ink text-mist">
        <div className="mx-auto max-w-[880px] px-[clamp(20px,5vw,40px)] pb-[clamp(40px,8vw,60px)] pt-[clamp(48px,10vw,72px)]">
            <p className="m-0 mb-4 text-center font-mono text-[11px] tracking-[0.16em] text-dark-muted">
                GET IN TOUCH
            </p>
            <h2 className="m-0 mx-auto mb-[clamp(24px,5vw,34px)] max-w-[560px] text-center font-sans text-[clamp(27px,6vw,42px)] font-normal leading-[1.05] tracking-[-0.02em]">
                Let&apos;s build something that lasts.
            </h2>

            <div className="mx-auto flex w-full max-w-[760px] flex-col items-center gap-[18px]">
                <div className="flex w-full flex-wrap justify-center gap-3.5">
                    {CONTACT_CARDS.map((card) => (
                        <a
                            href={card.href}
                            key={card.label}
                            className="flex min-w-0 flex-[1_1_300px] items-center gap-4 border border-dark-line px-[18px] py-4 text-mist no-underline transition-colors duration-[250ms] hover:border-dark-muted hover:bg-dark-hover"
                            {...(card.external
                                ? {
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                  }
                                : {})}
                        >
                            <span className="grid h-[42px] w-[42px] flex-none place-items-center border border-dark-line">
                                {card.icon}
                            </span>
                            <span className="flex min-w-0 flex-col gap-1">
                                <span className="font-mono text-[10px] tracking-[0.14em] text-dark-muted">
                                    {card.label}
                                </span>
                                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[15px]">
                                    {card.value}
                                </span>
                            </span>
                            <span className="ml-auto font-mono text-[15px] text-dark-muted">
                                ↗
                            </span>
                        </a>
                    ))}
                </div>
                <p className="m-0 mt-2.5 text-center text-sm leading-[1.6] text-dark-muted">
                    Open to full-stack &amp; backend roles — contract or
                    full-time.
                </p>
            </div>

            <div className="mt-[clamp(40px,8vw,60px)] flex flex-wrap items-center justify-between gap-3 border-t border-dark-line pt-[22px] font-mono text-[11px] tracking-[0.06em] text-dark-muted">
                <span>© {YEAR} WENDY LEE</span>
                <a
                    href="#"
                    className="text-dark-muted no-underline transition-colors duration-[250ms] hover:text-mist"
                >
                    BACK TO TOP ↑
                </a>
            </div>
        </div>
    </section>
);

export default Contact;
