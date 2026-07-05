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
        duration: "JUL 2025 — PRESENT",
        title: "Frontend Engineer",
        org: "@ Pinkoi",
        stack: ["AI Agent", "React", "TypeScript", "Zustand", "Webpack"],
        points: [
            "Initiated React Router v6 adoption by extending the existing adaptive API to migrate v3 and v5 syntax to v5-compat, then developed an autonomous migrator agent with properly scoped boundaries that cut migration time by 50%.",
            "Built an agent skill to automate analytic tracking event implementation and verification, saving 5 minutes per user flow test case while improving code accuracy and maintainability.",
            "Built a ticket release landing page powered by a refactored textpool CMS, migrating from a legacy HOC pattern to a React Context-based architecture with TypeScript, enabling independent business team copy edits.",
            "Designed and implemented a reusable Add-to-Cart CTA component for the homepage revamp within a one-week sprint, eliminating UI coupling and jQuery state management.",
        ],
    },
    {
        duration: "MAY 2024 — JUL 2025",
        title: "Mobile Engineer",
        org: "@ Citiesocial",
        stack: [
            "React Native",
            "TypeScript",
            "Redux Toolkit",
            "Shopify GraphQL",
        ],
        points: [
            "Refactored the codebase by migrating from JavaScript to TypeScript and upgrading React Native from version 0.64 to 0.74, which decreased the app's bundled size by 31% for iOS and 16% for Android.",
            "Rebuilt a new data flow architecture for critical features, including social login, shopping cart, and favorite product management. Integrated Redux Toolkit into the codebase by implementing async thunk actions and listener middleware, which reduced duplicated business logic and increased maintainability.",
            "Built a CI/CD workflow with fastlane and GitHub Actions to deploy iOS and Android apps, cutting release cycles from hours to minutes.",
        ],
    },
    {
        duration: "JUN 2022 — DEC 2023",
        title: "Backend Engineer",
        org: "@ Foodpanda",
        stack: ["GoLang", "AWS", "Docker", "SQL", "Postman"],
        points: [
            "Launched a feature (add pro to cart) across Southeast Asia markets, which increased the subscription conversion rate by 23%.",
            "Led the architecture design for subscription benefits data CRUD, which improved the data management user flow and resolved technical debt of storing duplicated data. Performed unit tests and integration tests on key user flows to uphold a minimum code coverage of 70%.",
            "Won first place in a company hackathon focused on leveraging AI to improve business profitability, building a predictive model with Google Vertex AI trained on user metadata to identify subscription cancellation reasons, enabling the marketing team to make targeted retention decisions.",
        ],
    },
];

export const PROJECTS: Array<Project> = [
    {
        kind: "SIDE PROJECT",
        title: "Replyo",
        description:
            "Designed and implemented an auto-reply bot for Threads that matches keywords and responds in seconds, saving operational time of manual reply.",
        stack: ["Next.js", "TypeScript", "Express", "Redis", "Threads API"],
        links: [
            {
                label: "LIVE DEMO",
                href: "https://replyo-client.vercel.app/",
            },
            {
                label: "GITHUB",
                href: "https://github.com/yuhueilee/replyo",
            },
        ],
        shots: [null, null, null],
    },
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
];
