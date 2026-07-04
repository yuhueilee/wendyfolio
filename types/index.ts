import type { StaticImageData } from "next/image";

export interface Job {
    duration: string;
    title: string;
    org: string;
    points: Array<string>;
}

export interface ProjectLink {
    label: string;
    href: string;
}

export interface Project {
    kind: string;
    title: string;
    description: string;
    stack: Array<string>;
    links: Array<ProjectLink>;
    shots: Array<StaticImageData | null>;
}
