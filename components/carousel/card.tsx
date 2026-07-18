"use client";

import { useState, type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { isVideoSource, type MediaSource } from "../../types";

import "swiper/css";
import "swiper/css/zoom";

import GlassButton from "../glass-button";
import Picture from "../picture";
import Video from "../video";
import FullscreenCarousel from "./fullscreen";

type CardCarouselProps = {
    title: string;
    shots: Array<MediaSource | null>;
    children?: (openGallery: () => void) => ReactNode;
};

const CardCarousel = ({ title, shots, children }: CardCarouselProps) => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [active, setActive] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const hasMultipleShots = shots.length > 1;

    return (
        <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-ink">
            <div className="absolute inset-0">
                <Swiper
                    className="h-full w-full rounded-[32px] bg-tint [&_.swiper-slide]:h-full"
                    modules={[Zoom]}
                    onSwiper={setSwiper}
                    onSlideChange={(s) => setActive(s.realIndex)}
                    slidesPerView={1}
                    loop={hasMultipleShots}
                    zoom={{ maxRatio: 3 }}
                >
                    {shots.map((media, j) => (
                        <SwiperSlide key={j}>
                            {media && isVideoSource(media) ? (
                                <Video
                                    src={media}
                                    aria-label={`${title} · video 0${j + 1}`}
                                    className="block h-full w-full cursor-pointer bg-black object-cover"
                                    onClick={() => setLightboxIndex(j)}
                                    onKeyDown={(event) => {
                                        if (
                                            event.key === "Enter" ||
                                            event.key === " "
                                        ) {
                                            event.preventDefault();
                                            setLightboxIndex(j);
                                        }
                                    }}
                                    preload="metadata"
                                    role="button"
                                    tabIndex={0}
                                />
                            ) : (
                                <div
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`View ${title} · shot 0${j + 1}`}
                                    onClick={() => {
                                        if (swiper?.allowClick !== false) {
                                            setLightboxIndex(j);
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "Enter" ||
                                            e.key === " "
                                        ) {
                                            e.preventDefault();
                                            setLightboxIndex(j);
                                        }
                                    }}
                                    className={`flex h-full w-full cursor-pointer ${
                                        media ? "swiper-zoom-container" : ""
                                    }`}
                                >
                                    {media ? (
                                        <Picture
                                            src={media}
                                            alt={`${title} · shot 0${j + 1}`}
                                            className="block h-full w-full object-cover"
                                            loading={j === 0 ? "eager" : "lazy"}
                                            decoding="async"
                                        />
                                    ) : (
                                        <div className="grid h-full w-full place-items-center bg-[repeating-linear-gradient(45deg,#E9F2FA,#E9F2FA_10px,#DFEAF5_10px,#DFEAF5_20px)] p-3 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                                            {title} · shot 0{j + 1}
                                        </div>
                                    )}
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
                {hasMultipleShots && (
                    <>
                        <GlassButton
                            label="Previous"
                            onClick={() => swiper?.slidePrev()}
                            hideOnMobile
                            className="absolute left-2.5 top-1/2 z-[3] -translate-y-1/2 wide:hidden"
                        >
                            ‹
                        </GlassButton>
                        <GlassButton
                            label="Next"
                            onClick={() => swiper?.slideNext()}
                            hideOnMobile
                            className="absolute right-2.5 top-1/2 z-[3] -translate-y-1/2 wide:hidden"
                        >
                            ›
                        </GlassButton>
                        <div className="absolute left-0 right-0 top-3 z-[3] flex justify-center gap-1.5">
                            {shots.map((_, j) => (
                                <button
                                    type="button"
                                    key={j}
                                    onClick={() => swiper?.slideToLoop(j)}
                                    aria-label="Go to slide"
                                    className="h-[7px] cursor-pointer rounded border-0 p-0 transition-[width,background]"
                                    style={{
                                        width: j === active ? "20px" : "7px",
                                        background:
                                            j === active
                                                ? "#FFFFFF"
                                                : "rgba(255,255,255,0.38)",
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(12,23,31,0.02)_18%,rgba(12,23,31,0.18)_42%,rgba(12,23,31,0.94)_100%)]" />
            {children?.(() => setLightboxIndex(active))}
            {lightboxIndex !== null && (
                <FullscreenCarousel
                    title={title}
                    shots={shots}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </div>
    );
};

export default CardCarousel;
