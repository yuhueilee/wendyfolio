import { fireEvent, render, screen } from "@testing-library/react";

import { JOBS } from "../data";
import Experience from "./index";

const companyName = (org: string) => org.replace(/^@\s*/, "");

describe("correctly returns the experience component", () => {
    it("renders a tab for every company", () => {
        render(<Experience />);

        expect(screen.getByText("JOB EXPERIENCE")).toBeInTheDocument();
        const tabs = screen.getAllByRole("tab");
        expect(tabs).toHaveLength(JOBS.length);
        JOBS.forEach((job) => {
            expect(
                screen.getByRole("tab", { name: companyName(job.org) })
            ).toBeInTheDocument();
        });
    });

    it("shows the first job by default", () => {
        render(<Experience />);

        const job = JOBS[0];
        expect(screen.getByText(job.title)).toBeInTheDocument();
        expect(screen.getByText(job.org)).toBeInTheDocument();
        expect(screen.getByText(job.duration)).toBeInTheDocument();
        expect(screen.getAllByRole("listitem")).toHaveLength(
            job.points.length
        );
        job.points.forEach((point) => {
            expect(screen.getByText(point)).toBeInTheDocument();
        });
    });

    it("switches the visible job when a tab is clicked", () => {
        render(<Experience />);

        JOBS.forEach((job) => {
            fireEvent.click(
                screen.getByRole("tab", { name: companyName(job.org) })
            );

            expect(
                screen.getByRole("tab", { name: companyName(job.org) })
            ).toHaveAttribute("aria-selected", "true");
            expect(screen.getByText(job.title)).toBeInTheDocument();
            expect(screen.getByText(job.duration)).toBeInTheDocument();
            job.points.forEach((point) => {
                expect(screen.getByText(point)).toBeInTheDocument();
            });
        });
    });
});
