import { render, screen } from '@testing-library/react';

import Introduction from './index';

describe("correctly returns the introduction component", () => {
    it("renders introduction content correctly", () => {
        render(<Introduction />);

        // Check if name, role, and introduction text are rendered
        expect(screen.getByText("Wendy (Lee Yu Huei)")).toBeInTheDocument();
        expect(screen.getByText("Software Engineer")).toBeInTheDocument();
        expect(
            screen.getByText("Never stop learning and improving!")
        ).toBeInTheDocument();

        // Check if image is rendered
        const profileImage = screen.getByRole("img");
        expect(profileImage).toHaveAttribute("src", "/images/profile-pic.jpeg");

        // Check if email, GitHub, and LinkedIn buttons are rendered
        expect(
            screen.getByRole("button", { name: "wendylee70127@gmail.com" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Github" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "LinkedIn" })
        ).toBeInTheDocument();
    });
});
