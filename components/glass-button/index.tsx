import type { ReactNode } from "react";

type GlassButtonProps = {
    label: string;
    onClick: () => void;
    hideOnMobile?: boolean;
    className?: string;
    children: ReactNode;
};

const GlassButton = ({
    label,
    onClick,
    hideOnMobile = false,
    className = "",
    children,
}: GlassButtonProps) => (
    <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={`${
            hideOnMobile ? "hidden wide:grid" : "grid"
        } h-9 w-9 cursor-pointer place-items-center rounded-full border-0 bg-[rgba(244,252,251,0.8)] text-[17px] text-ink backdrop-blur-[4px] transition-colors duration-[250ms] hover:bg-[rgba(36,60,76,0.8)] hover:text-mist ${className}`}
    >
        {children}
    </button>
);

export default GlassButton;
