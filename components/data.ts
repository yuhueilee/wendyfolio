import project1Img from "../public/images/project-1.png";
import { Job, Project } from "../types";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const RESUME_HREF = `${BASE_PATH}/assets/YuHuei-Lee-Resume.pdf`;
export const EMAIL = "wendylee70127@gmail.com";
export const GITHUB_HREF = "https://github.com/yuhueilee";
export const LINKEDIN_HREF = "https://www.linkedin.com/in/yuhueilee-wendy/";
export const YEAR = "2026";

export const JOBS: Array<Job> = [
    {
        duration: "JUN 2022 — DEC 2023",
        title: "Backend Software Engineer",
        org: "@ foodpanda Taiwan",
        points: [
            "Worked closely with client engineers, product managers, product analysts, and designers to seamlessly and punctually deliver features.",
            "Developed and maintained the backend service for subscription functionality, ensuring accurate behavior through rigorous staging tests.",
            "Troubleshooted production issues using Datadog and the AWS console, consistently resolving them within a 5-hour timeframe.",
            "Performed unit and integration tests on key user flows to uphold a minimum code coverage of 70%.",
        ],
    },
    {
        duration: "JAN 2021 — JUN 2021",
        title: "Frontend Intern",
        org: "@ Wavelet Solutions",
        points: [
            "Implemented a responsive user interface using Ionic components for an e-commerce website used by retail chain stores.",
            "Applied Angular Redux to automatically reflect state changes on the user interface.",
        ],
    },
];

export const PROJECTS: Array<Project> = [
    {
        kind: "SIDE PROJECT",
        title: "Penguin Battle",
        description:
            "A turn-based board game developed with React, leveraging the boardgame.io library for the game logic. Playable online — bring a friend and fight over fish.",
        stack: ["React", "boardgame.io", "TypeScript"],
        links: [
            { label: "LIVE DEMO", href: "https://penguin-battle.netlify.app/" },
            {
                label: "GITHUB",
                href: "https://github.com/yuhueilee/penguin-game",
            },
        ],
        shots: [project1Img, null, null],
    },
    {
        kind: "SIDE PROJECT",
        title: "Wendyfolio",
        description:
            "This portfolio itself — a statically exported Next.js site with component-level SCSS, unit tests on every component, and CI-friendly builds.",
        stack: ["Next.js", "TypeScript", "SCSS", "Jest"],
        links: [{ label: "GITHUB", href: "https://github.com/yuhueilee" }],
        shots: [null, null, null],
    },
];
