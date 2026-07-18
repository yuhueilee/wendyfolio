import { act, fireEvent, render } from "@testing-library/react";

import Video from "./index";

describe("Video", () => {
    let observerCallback: IntersectionObserverCallback;
    const observe = jest.fn();
    const disconnect = jest.fn();

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
        jest.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(
            () => undefined
        );
        observe.mockClear();
        disconnect.mockClear();
        window.matchMedia = jest.fn().mockReturnValue({
            matches: true,
            media: "(hover: hover) and (pointer: fine)",
        });
        global.IntersectionObserver = jest.fn((callback) => {
            observerCallback = callback;
            return {
                disconnect,
                observe,
                root: null,
                rootMargin: "0px",
                takeRecords: () => [],
                thresholds: [0.35],
                unobserve: jest.fn(),
            };
        }) as unknown as typeof IntersectionObserver;
    });

    it("loads a muted, looping MP4 without native controls", () => {
        const { container } = render(
            <Video
                src={{ mp4: "https://cdn.example.com/video.mp4" }}
                aria-label="Demo video"
            />
        );

        const video = container.querySelector("video");
        const source = container.querySelector("source");

        expect(video).toHaveAttribute("aria-label", "Demo video");
        expect(video).toHaveAttribute("autoplay");
        expect(video).toHaveAttribute("loop");
        expect(video).toHaveAttribute("playsinline");
        expect(video).not.toHaveAttribute("controls");
        expect(video).toHaveProperty("muted", true);
        expect(source).toHaveAttribute(
            "src",
            "https://cdn.example.com/video.mp4"
        );
        expect(source).toHaveAttribute("type", "video/mp4");
    });

    it("shows the current playback state in the top-right badge", () => {
        const { container, getByLabelText } = render(
            <Video src={{ mp4: "https://cdn.example.com/video.mp4" }} />
        );
        const video = container.querySelector("video")!;

        expect(getByLabelText("Video paused")).toBeInTheDocument();

        fireEvent.play(video);
        expect(getByLabelText("Video playing")).toBeInTheDocument();

        fireEvent.pause(video);
        expect(getByLabelText("Video paused")).toBeInTheDocument();
    });

    it("plays in the viewport and pauses outside it", async () => {
        const play = jest.mocked(HTMLMediaElement.prototype.play);
        const pause = jest.mocked(HTMLMediaElement.prototype.pause);
        const { container } = render(
            <Video src={{ mp4: "https://cdn.example.com/video.mp4" }} />
        );
        const video = container.querySelector("video")!;

        await act(async () => {
            observerCallback(
                [
                    {
                        isIntersecting: true,
                        target: video,
                    } as unknown as IntersectionObserverEntry,
                ],
                {} as IntersectionObserver
            );
        });
        expect(play).toHaveBeenCalledTimes(1);

        act(() => {
            observerCallback(
                [
                    {
                        isIntersecting: false,
                        target: video,
                    } as unknown as IntersectionObserverEntry,
                ],
                {} as IntersectionObserver
            );
        });
        expect(pause).toHaveBeenCalledTimes(1);
    });

    it("pauses on desktop hover and resumes when the pointer leaves", async () => {
        const play = jest.mocked(HTMLMediaElement.prototype.play);
        const pause = jest.mocked(HTMLMediaElement.prototype.pause);
        const { container } = render(
            <Video src={{ mp4: "https://cdn.example.com/video.mp4" }} />
        );
        const video = container.querySelector("video")!;

        await act(async () => {
            observerCallback(
                [
                    {
                        isIntersecting: true,
                        target: video,
                    } as unknown as IntersectionObserverEntry,
                ],
                {} as IntersectionObserver
            );
        });
        play.mockClear();

        fireEvent.mouseEnter(video);
        expect(pause).toHaveBeenCalledTimes(1);

        fireEvent.mouseLeave(video);
        expect(play).toHaveBeenCalledTimes(1);
    });

    it("toggles playback on click and keyboard activation", () => {
        const play = jest.mocked(HTMLMediaElement.prototype.play);
        const pause = jest.mocked(HTMLMediaElement.prototype.pause);
        const { container, getByLabelText } = render(
            <Video
                src={{ mp4: "https://cdn.example.com/video.mp4" }}
                toggleOnClick
            />
        );
        const video = container.querySelector("video")!;

        Object.defineProperty(video, "paused", {
            configurable: true,
            value: false,
        });
        fireEvent.click(video);
        expect(pause).toHaveBeenCalledTimes(1);
        expect(getByLabelText("Video paused")).toBeInTheDocument();

        Object.defineProperty(video, "paused", {
            configurable: true,
            value: true,
        });
        fireEvent.keyDown(video, { key: "Enter" });
        expect(play).toHaveBeenCalledTimes(1);
        expect(getByLabelText("Video resumed")).toBeInTheDocument();
    });

    it("hides resumed feedback after a short delay", () => {
        jest.useFakeTimers();
        const { container, queryByLabelText } = render(
            <Video
                src={{ mp4: "https://cdn.example.com/video.mp4" }}
                toggleOnClick
            />
        );
        const video = container.querySelector("video")!;

        Object.defineProperty(video, "paused", {
            configurable: true,
            value: true,
        });
        fireEvent.click(video);
        expect(queryByLabelText("Video resumed")).toBeInTheDocument();

        act(() => jest.advanceTimersByTime(700));
        expect(queryByLabelText("Video resumed")).not.toBeInTheDocument();
        jest.useRealTimers();
    });

    it("keeps playing on touch-style pointers", () => {
        window.matchMedia = jest.fn().mockReturnValue({ matches: false });
        const pause = jest.mocked(HTMLMediaElement.prototype.pause);
        const { container } = render(
            <Video src={{ mp4: "https://cdn.example.com/video.mp4" }} />
        );

        fireEvent.mouseEnter(container.querySelector("video")!);
        expect(pause).not.toHaveBeenCalled();
    });
});
