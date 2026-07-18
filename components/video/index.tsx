"use client";

import {
    useEffect,
    useRef,
    useState,
    type ComponentPropsWithoutRef,
} from "react";

import type { VideoSource } from "../../types";

type VideoProps = Omit<
    ComponentPropsWithoutRef<"video">,
    | "autoPlay"
    | "controls"
    | "loop"
    | "muted"
    | "onMouseEnter"
    | "onMouseLeave"
    | "onPause"
    | "onPlay"
    | "playsInline"
    | "src"
> & {
    src: VideoSource;
};

const DESKTOP_HOVER_QUERY = "(hover: hover) and (pointer: fine)";

const PlayIcon = () => (
    <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current">
        <path d="M4 2.5v11L13 8 4 2.5Z" />
    </svg>
);

const PauseIcon = () => (
    <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current">
        <path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z" />
    </svg>
);

const Video = ({ src, ...videoProps }: VideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInViewport = useRef(false);
    const isPausedByHover = useRef(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const playIfVisible = () => {
        const video = videoRef.current;
        if (video && isInViewport.current && !isPausedByHover.current) {
            void video.play().catch(() => undefined);
        }
    };

    const handleMouseEnter = () => {
        if (
            typeof window.matchMedia !== "function" ||
            !window.matchMedia(DESKTOP_HOVER_QUERY).matches
        ) {
            return;
        }

        isPausedByHover.current = true;
        videoRef.current?.pause();
    };

    const handleMouseLeave = () => {
        if (!isPausedByHover.current) return;

        isPausedByHover.current = false;
        playIfVisible();
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video || typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                isInViewport.current = entry.isIntersecting;
                if (isInViewport.current) {
                    playIfVisible();
                } else {
                    video.pause();
                }
            },
            { threshold: 0.35 }
        );

        observer.observe(video);
        return () => {
            observer.disconnect();
            video.pause();
        };
    }, []);

    return (
        <div
            className="relative flex h-full w-full items-center justify-center overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <video
                {...videoProps}
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src={src.mp4} type="video/mp4" />
                Your browser does not support HTML video.
            </video>
            <span
                role="status"
                aria-label={isPlaying ? "Video playing" : "Video paused"}
                className="pointer-events-none absolute right-2.5 top-2.5 z-[2] grid h-8 w-8 place-items-center text-[rgba(36,60,76,0.8)] drop-shadow-[0_1px_2px_rgba(21,36,46,0.72)]"
            >
                {isPlaying ? <PlayIcon /> : <PauseIcon />}
            </span>
        </div>
    );
};

export default Video;
