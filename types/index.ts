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

export interface Project {
    kind: string;
    title: string;
    description: string;
    stack: Array<string>;
    links: Array<ProjectLink>;
    shots: Array<PictureSource | null>;
}
