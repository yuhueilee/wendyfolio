"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { isVideoSource, type MediaSource } from "../../types";

import "swiper/css";

import GlassButton from "../glass-button";
import Picture from "../picture";
import Video from "../video";
import Lightbox from "./lightbox";

type CarouselProps = {
    title: string;
    shots: Array<MediaSource | null>;
    imageLeft?: boolean;
};

const Carousel = ({ title, shots, imageLeft = false }: CarouselProps) => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [active, setActive] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const hasMultipleShots = shots.length > 1;

    return (
        <div
            className={`relative wide:flex wide:min-w-0 wide:flex-[0_0_40%] wide:flex-col wide:justify-center`}
        >
            <div className="relative aspect-[4/3] w-full">
                <Swiper
                    className="h-full w-full bg-tint [&_.swiper-slide]:h-full"
                    onSwiper={setSwiper}
                    onSlideChange={(s) => setActive(s.realIndex)}
                    slidesPerView={1}
                    loop={hasMultipleShots}
                >
                    {shots.map((media, j) => (
                        <SwiperSlide key={j}>
                            {media && isVideoSource(media) ? (
                                <Video
                                    src={media}
                                    aria-label={`${title} · video 0${j + 1}`}
                                    className="block aspect-[4/3] h-full w-full bg-black object-cover"
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
                                    onClick={() => setLightboxIndex(j)}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "Enter" ||
                                            e.key === " "
                                        ) {
                                            e.preventDefault();
                                            setLightboxIndex(j);
                                        }
                                    }}
                                    className="flex h-full w-full cursor-zoom-in"
                                >
                                    {media ? (
                                        <Picture
                                            src={media}
                                            alt={`${title} · shot 0${j + 1}`}
                                            className="block h-full w-full object-cover"
                                            loading={
                                                j === 0 ? "eager" : "lazy"
                                            }
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
                            className="absolute left-2.5 top-1/2 z-[3] -translate-y-1/2"
                        >
                            ‹
                        </GlassButton>
                        <GlassButton
                            label="Next"
                            onClick={() => swiper?.slideNext()}
                            hideOnMobile
                            className="absolute right-2.5 top-1/2 z-[3] -translate-y-1/2"
                        >
                            ›
                        </GlassButton>
                        <div className="absolute bottom-2.5 left-0 right-0 z-[3] flex justify-center gap-1.5">
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
                                                ? "#5289AD"
                                                : "rgba(36,60,76,0.25)",
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            {lightboxIndex !== null && (
                <Lightbox
                    title={title}
                    shots={shots}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </div>
    );
};

export default Carousel;
