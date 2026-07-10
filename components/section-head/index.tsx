type SectionHeadProps = {
    title: string;
    spacing?: string;
};

const SectionHead = ({
    title,
    spacing = "mb-[clamp(32px,7vw,44px)]",
}: SectionHeadProps) => (
    <div
        className={`flex items-baseline justify-between border-b border-ink pb-3.5 ${spacing}`}
    >
        <h2 className="m-0 font-mono text-[13px] font-medium tracking-[0.16em]">
            {title}
        </h2>
    </div>
);

export default SectionHead;
