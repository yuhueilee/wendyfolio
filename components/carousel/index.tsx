"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import type { StaticImageData } from "next/image";

import "swiper/css";

type CarouselProps = {
    title: string;
    shots: Array<StaticImageData | null>;
    imageLeft?: boolean;
};

const NAV_BTN =
    "absolute top-1/2 z-[3] hidden h-9 w-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-0 bg-[rgba(244,252,251,0.8)] text-[17px] text-ink backdrop-blur-[4px] transition-colors duration-[250ms] hover:bg-[rgba(36,60,76,0.8)] hover:text-mist wide:grid";

const Carousel = ({ title, shots, imageLeft = false }: CarouselProps) => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [active, setActive] = useState(0);

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
                    loop
                >
                    {shots.map((img, j) => (
                        <SwiperSlide key={j}>
                            <div className="flex h-full w-full">
                                {img ? (
                                    <img
                                        src={img.src}
                                        alt={`${title} · shot 0${j + 1}`}
                                        className="block h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="grid h-full w-full place-items-center bg-[repeating-linear-gradient(45deg,#E9F2FA,#E9F2FA_10px,#DFEAF5_10px,#DFEAF5_20px)] p-3 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                                        {title} · shot 0{j + 1}
                                    </div>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button
                    type="button"
                    onClick={() => swiper?.slidePrev()}
                    aria-label="Previous"
                    className={`${NAV_BTN} left-2.5`}
                >
                    ‹
                </button>
                <button
                    type="button"
                    onClick={() => swiper?.slideNext()}
                    aria-label="Next"
                    className={`${NAV_BTN} right-2.5`}
                >
                    ›
                </button>
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
            </div>
        </div>
    );
};

export default Carousel;
