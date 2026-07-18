"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Zoom } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { isVideoSource, type MediaSource } from "../../types";

import "swiper/css";
import "swiper/css/zoom";

import GlassButton from "../glass-button";
import Picture from "../picture";
import Video from "../video";

type LightboxProps = {
    title: string;
    shots: Array<MediaSource | null>;
    initialIndex: number;
    onClose: () => void;
};

const MAX_ZOOM = 3;
const MAX_THUMBS = 3;
const DISMISS_DISTANCE = 100;

const Lightbox = ({ title, shots, initialIndex, onClose }: LightboxProps) => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [active, setActive] = useState(initialIndex);
    const [dismissOffset, setDismissOffset] = useState(0);
    const touchStart = useRef<{ x: number; y: number } | null>(null);

    const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
        if (event.touches.length !== 1) {
            touchStart.current = null;
            return;
        }

        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
        const start = touchStart.current;
        if (
            !start ||
            event.touches.length !== 1 ||
            (swiper?.zoom.scale ?? 1) > 1
        ) {
            touchStart.current = null;
            setDismissOffset(0);
            return;
        }

        const touch = event.touches[0];
        const deltaX = touch.clientX - start.x;
        const deltaY = touch.clientY - start.y;
        if (deltaY > 0 && Math.abs(deltaY) > Math.abs(deltaX)) {
            setDismissOffset(deltaY);
        }
    };

    const handleTouchEnd = () => {
        touchStart.current = null;
        if (dismissOffset >= DISMISS_DISTANCE) {
            onClose();
            return;
        }
        setDismissOffset(0);
    };

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

    const thumbs = shots.slice(0, MAX_THUMBS);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery`}
            className="fixed inset-0 z-[60] flex flex-col bg-[rgba(21,36,46,0.94)] backdrop-blur-[6px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => {
                touchStart.current = null;
                setDismissOffset(0);
            }}
            style={{
                opacity: Math.max(0.5, 1 - dismissOffset / 500),
                transform: `translateY(${dismissOffset}px)`,
                transition:
                    dismissOffset === 0
                        ? "transform 200ms, opacity 200ms"
                        : "none",
            }}
        >
            <div className="flex items-center justify-between px-[clamp(16px,4vw,28px)] py-3.5">
                <span className="font-mono text-[11px] tracking-[0.08em] text-dark-muted">
                    {active + 1} / {shots.length}
                </span>
                <GlassButton label="Close" onClick={onClose}>
                    ✕
                </GlassButton>
            </div>

            <div className="relative min-h-0 flex-1">
                <Swiper
                    className="h-full w-full [&_.swiper-slide]:h-full"
                    modules={[Zoom, Keyboard, Mousewheel]}
                    onSwiper={setSwiper}
                    onSlideChange={(s) => setActive(s.realIndex)}
                    initialSlide={initialIndex}
                    slidesPerView={1}
                    loop={shots.length > 1}
                    zoom={{ maxRatio: MAX_ZOOM }}
                    keyboard={{ enabled: true }}
                    mousewheel
                >
                    {shots.map((media, j) => (
                        <SwiperSlide key={j}>
                            {media && isVideoSource(media) ? (
                                <div className="flex h-full w-full items-center justify-center">
                                    <Video
                                        src={media}
                                        aria-label={`${title} · video 0${j + 1}`}
                                        className="h-full w-full bg-black object-contain"
                                        pauseOnHover={false}
                                        preload="metadata"
                                        role="button"
                                        tabIndex={0}
                                        toggleOnClick
                                    />
                                </div>
                            ) : (
                                <div className="swiper-zoom-container flex h-full w-full items-center justify-center">
                                    {media ? (
                                        <Picture
                                            src={media}
                                            alt={`${title} · shot 0${j + 1}`}
                                            className="h-full w-full object-contain"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    ) : (
                                        <div className="grid aspect-[4/3] max-h-full w-full max-w-[720px] place-items-center bg-[repeating-linear-gradient(45deg,#E9F2FA,#E9F2FA_10px,#DFEAF5_10px,#DFEAF5_20px)] p-3 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                                            {title} · shot 0{j + 1}
                                        </div>
                                    )}
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
                {shots.length > 1 && (
                    <>
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
                    </>
                )}
            </div>

            <div className="border-t border-dark-line px-[clamp(16px,4vw,28px)] py-3.5 text-center">
                <div className="flex justify-center gap-2">
                    {thumbs.map((media, j) => (
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
                            {media && isVideoSource(media) ? (
                                <video
                                    aria-hidden
                                    className="block h-full w-full object-cover"
                                    preload="metadata"
                                    muted
                                    playsInline
                                    onLoadedData={(event) => {
                                        event.currentTarget.currentTime = 0.1;
                                    }}
                                >
                                    <source src={media.mp4} type="video/mp4" />
                                </video>
                            ) : media ? (
                                <Picture
                                    src={media}
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
                    {title}
                </p>
            </div>
        </div>
    );
};

export default Lightbox;
