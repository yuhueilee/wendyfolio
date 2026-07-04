import { render, screen } from "@testing-library/react";

import { JOBS } from "../data";
import Experience from "./index";

describe("correctly returns the experience component", () => {
    it("renders every job with its organisation and duration", () => {
        render(<Experience />);

        expect(screen.getByText("JOB EXPERIENCE")).toBeInTheDocument();
        JOBS.forEach((job) => {
            expect(screen.getByText(job.title)).toBeInTheDocument();
            expect(screen.getByText(job.org)).toBeInTheDocument();
            expect(screen.getByText(job.duration)).toBeInTheDocument();
        });
    });

    it("renders every bullet point of every job", () => {
        render(<Experience />);

        const points = JOBS.flatMap((job) => job.points);
        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(points.length);
        points.forEach((point) => {
            expect(screen.getByText(point)).toBeInTheDocument();
        });
    });
});
