import { render, screen } from '@testing-library/react';

import Experience from './index';

describe("correctly returns the experience component", () => {
    it("renders a container", () => {
        render(<Experience />);

        expect(screen.getByText(/job experiences/i)).toBeInTheDocument();
        expect(screen.getByText(/education/i)).toBeInTheDocument();
    });
});
