import { RESUME_HREF } from "../data";
import { DownloadIcon } from "../icons";

const GLASS =
    "border border-[rgba(82,137,173,0.25)] bg-[rgba(244,252,251,0.78)] shadow-glass backdrop-blur-[14px] backdrop-saturate-[1.8]";

const NAV_LINKS = [
    { label: "ABOUT", href: "#about" },
    { label: "JOBS", href: "#experience" },
    { label: "WORK", href: "#work" },
    { label: "CONTACT", href: "#contact" },
];

const Header = () => (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2.5 px-[clamp(12px,4vw,40px)] py-3">
        <div
            className={`pointer-events-auto hidden items-center justify-self-start rounded-full px-[15px] py-[11px] font-mono text-xs font-medium tracking-[0.1em] text-ink sm:inline-flex ${GLASS}`}
        >
            WL
        </div>

        <nav
            className={`pointer-events-auto col-start-2 inline-flex justify-self-center gap-0.5 rounded-full p-[5px] ${GLASS}`}
        >
            {NAV_LINKS.map((link) => (
                <a
                    href={link.href}
                    key={link.label}
                    className="rounded-full px-[clamp(9px,2.6vw,16px)] py-2 font-mono text-[11px] tracking-[0.07em] text-ink no-underline transition-colors duration-[250ms] hover:bg-ink hover:text-white"
                >
                    {link.label}
                </a>
            ))}
        </nav>

        <div className="pointer-events-auto col-start-3 inline-flex items-center gap-2 justify-self-end">
            <a
                href={RESUME_HREF}
                download
                className="hidden items-center gap-2 rounded-full border border-accent bg-accent px-4 py-[11px] font-mono text-[11px] tracking-[0.06em] text-mist no-underline shadow-float transition-colors duration-[250ms] hover:bg-accent-dark sm:inline-flex"
            >
                RÉSUMÉ&nbsp;↓
            </a>
            <a
                href={RESUME_HREF}
                download
                aria-label="Download résumé"
                title="Download résumé"
                className="grid h-[42px] w-[42px] place-items-center rounded-full border border-accent bg-accent text-mist shadow-float transition-colors duration-[250ms] hover:bg-accent-dark sm:hidden"
            >
                <DownloadIcon size={17} />
            </a>
        </div>
    </header>
);

export default Header;
