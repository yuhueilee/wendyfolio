export interface Job {
    duration: string;
    title: string;
    org: string;
    stack: Array<string>;
    points: Array<string>;
}

export interface ProjectLink {
    label: string;
    href: string;
}

export interface PictureSource {
    avif: string;
    webp: string;
    jpg: string;
}

export interface VideoSource {
    mp4: string;
}

export type MediaSource = PictureSource | VideoSource;
export type ProjectAspectRatio = "3:4" | "4:3";

export const isVideoSource = (source: MediaSource): source is VideoSource =>
    "mp4" in source;

export interface Project {
    kind: string;
    ratio: ProjectAspectRatio;
    title: string;
    description: string;
    stack: Array<string>;
    links: Array<ProjectLink>;
    shots: Array<MediaSource | null>;
}
