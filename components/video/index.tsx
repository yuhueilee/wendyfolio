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
    pauseOnHover?: boolean;
    showPlaybackStatus?: boolean;
    toggleOnClick?: boolean;
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

const Video = ({
    src,
    pauseOnHover = true,
    showPlaybackStatus = true,
    toggleOnClick = false,
    onClick,
    onKeyDown,
    ...videoProps
}: VideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInViewport = useRef(false);
    const isPausedByHover = useRef(false);
    const isPausedByUser = useRef(false);
    const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [centerFeedback, setCenterFeedback] = useState<
        "play" | "pause" | null
    >(null);

    const clearFeedbackTimer = () => {
        if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
        feedbackTimer.current = null;
    };

    const playIfVisible = () => {
        const video = videoRef.current;
        if (
            video &&
            isInViewport.current &&
            !isPausedByHover.current &&
            !isPausedByUser.current
        ) {
            void video.play().catch(() => undefined);
        }
    };

    const togglePlayback = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            isPausedByUser.current = false;
            clearFeedbackTimer();
            setCenterFeedback("play");
            feedbackTimer.current = setTimeout(
                () => setCenterFeedback(null),
                700
            );
            void video.play().catch(() => undefined);
        } else {
            isPausedByUser.current = true;
            clearFeedbackTimer();
            setCenterFeedback("pause");
            video.pause();
        }
    };

    const handleMouseEnter = () => {
        if (
            !pauseOnHover ||
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

    useEffect(
        () => () => {
            if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
        },
        []
    );

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
                onClick={(event) => {
                    onClick?.(event);
                    if (toggleOnClick && !event.defaultPrevented) {
                        togglePlayback();
                    }
                }}
                onKeyDown={(event) => {
                    onKeyDown?.(event);
                    if (
                        toggleOnClick &&
                        !event.defaultPrevented &&
                        (event.key === "Enter" || event.key === " ")
                    ) {
                        event.preventDefault();
                        togglePlayback();
                    }
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src={src.mp4} type="video/mp4" />
                Your browser does not support HTML video.
            </video>
            {toggleOnClick && centerFeedback ? (
                <span
                    role="status"
                    aria-label={
                        centerFeedback === "play"
                            ? "Video resumed"
                            : "Video paused"
                    }
                    className="pointer-events-none absolute inset-0 z-[2] grid place-items-center text-[rgba(36,60,76,0.8)] drop-shadow-[0_2px_4px_rgba(21,36,46,0.72)] [&_svg]:h-6 [&_svg]:w-6"
                >
                    {centerFeedback === "play" ? (
                        <PlayIcon />
                    ) : (
                        <PauseIcon />
                    )}
                </span>
            ) : !toggleOnClick && showPlaybackStatus ? (
                <span
                    role="status"
                    aria-label={isPlaying ? "Video playing" : "Video paused"}
                    className="pointer-events-none absolute right-2.5 top-2.5 z-[2] grid h-8 w-8 place-items-center text-[rgba(36,60,76,0.8)] drop-shadow-[0_1px_2px_rgba(21,36,46,0.72)]"
                >
                    {isPlaying ? <PlayIcon /> : <PauseIcon />}
                </span>
            ) : null}
        </div>
    );
};

export default Video;
