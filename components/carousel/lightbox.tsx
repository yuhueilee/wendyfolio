"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Zoom } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { PictureSource } from "../../types";

import "swiper/css";
import "swiper/css/zoom";

import GlassButton from "../glass-button";
import Picture from "../picture";

type LightboxProps = {
    title: string;
    shots: Array<PictureSource | null>;
    initialIndex: number;
    onClose: () => void;
};

const MAX_ZOOM = 3;
const ZOOM_STAGES = [1, 1.5, 2, 2.5, 3];
const MAX_THUMBS = 3;

const Lightbox = ({ title, shots, initialIndex, onClose }: LightboxProps) => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [active, setActive] = useState(initialIndex);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [onClose]);

    const zoomTo = (ratio: number) => {
        if (!swiper) return;
        if (ratio <= 1) {
            swiper.zoom.out();
            return;
        }
        swiper.zoom.in(Math.min(ratio, MAX_ZOOM));
        // Swiper anchors programmatic zoom at the last pointer position;
        // re-anchor the pan to keep the scale centered.
        const slideEl = swiper.slides[swiper.activeIndex];
        const wrapEl = slideEl?.querySelector<HTMLElement>(
            ".swiper-zoom-container"
        );
        if (wrapEl) wrapEl.style.transform = "translate3d(0px, 0px, 0)";
    };

    const zoomIn = () =>
        zoomTo(ZOOM_STAGES.find((stage) => stage > scale + 0.01) ?? MAX_ZOOM);
    const zoomOut = () =>
        zoomTo(
            [...ZOOM_STAGES]
                .reverse()
                .find((stage) => stage < scale - 0.01) ?? 1
        );

    const thumbs = shots.slice(0, MAX_THUMBS);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery`}
            className="fixed inset-0 z-[60] flex flex-col bg-[rgba(21,36,46,0.94)] backdrop-blur-[6px]"
        >
            <div className="flex items-center justify-between px-[clamp(16px,4vw,28px)] py-3.5">
                <span className="font-mono text-[11px] tracking-[0.08em] text-dark-muted">
                    {active + 1} / {shots.length}
                </span>
                <div className="flex items-center gap-2">
                    <input
                        type="range"
                        min={1}
                        max={MAX_ZOOM}
                        step={0.1}
                        value={scale}
                        aria-label="Zoom"
                        onChange={(e) => {
                            const ratio = Number(e.target.value);
                            setScale(ratio);
                            zoomTo(ratio);
                        }}
                        className="w-20 cursor-pointer accent-accent wide:w-28"
                    />
                    <GlassButton label="Zoom out" onClick={zoomOut}>
                        −
                    </GlassButton>
                    <GlassButton label="Zoom in" onClick={zoomIn}>
                        +
                    </GlassButton>
                    <GlassButton label="Close" onClick={onClose}>
                        ✕
                    </GlassButton>
                </div>
            </div>

            <div className="relative min-h-0 flex-1">
                <Swiper
                    className="h-full w-full [&_.swiper-slide]:h-full"
                    modules={[Zoom, Keyboard, Mousewheel]}
                    onSwiper={setSwiper}
                    onSlideChange={(s) => {
                        setActive(s.realIndex);
                        setScale(1);
                    }}
                    onZoomChange={(_, newScale) => setScale(newScale)}
                    initialSlide={initialIndex}
                    slidesPerView={1}
                    loop
                    zoom={{ maxRatio: MAX_ZOOM }}
                    keyboard={{ enabled: true }}
                    mousewheel
                >
                    {shots.map((img, j) => (
                        <SwiperSlide key={j}>
                            <div className="swiper-zoom-container h-full w-full px-[clamp(12px,6vw,64px)] py-2">
                                {img ? (
                                    <Picture
                                        src={img}
                                        alt={`${title} · shot 0${j + 1}`}
                                        className="max-h-full max-w-full object-contain"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                ) : (
                                    <div className="grid aspect-[4/3] max-h-full w-full max-w-[720px] place-items-center bg-[repeating-linear-gradient(45deg,#E9F2FA,#E9F2FA_10px,#DFEAF5_10px,#DFEAF5_20px)] p-3 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                                        {title} · shot 0{j + 1}
                                    </div>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <GlassButton
                    label="Previous"
                    onClick={() => swiper?.slidePrev()}
                    className="absolute left-[clamp(8px,2vw,20px)] top-1/2 z-[3] -translate-y-1/2"
                >
                    ‹
                </GlassButton>
                <GlassButton
                    label="Next"
                    onClick={() => swiper?.slideNext()}
                    className="absolute right-[clamp(8px,2vw,20px)] top-1/2 z-[3] -translate-y-1/2"
                >
                    ›
                </GlassButton>
            </div>

            <div className="border-t border-dark-line px-[clamp(16px,4vw,28px)] py-3.5 text-center">
                <div className="flex justify-center gap-2">
                    {thumbs.map((img, j) => (
                        <button
                            type="button"
                            key={j}
                            onClick={() => swiper?.slideToLoop(j)}
                            aria-label={`Go to shot ${j + 1}`}
                            aria-current={j === active}
                            className={`h-12 w-16 cursor-pointer overflow-hidden border-2 bg-transparent p-0 transition-opacity duration-[250ms] ${
                                j === active
                                    ? "border-accent opacity-100"
                                    : "border-transparent opacity-50 hover:opacity-90"
                            }`}
                        >
                            {img ? (
                                <Picture
                                    src={img}
                                    alt=""
                                    className="block h-full w-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                            ) : (
                                <div className="h-full w-full bg-[repeating-linear-gradient(45deg,#E9F2FA,#E9F2FA_10px,#DFEAF5_10px,#DFEAF5_20px)]" />
                            )}
                        </button>
                    ))}
                </div>
                <p className="mb-0 mt-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-mist">
                    {title} · shot 0{active + 1}
                </p>
            </div>
        </div>
    );
};

export default Lightbox;
