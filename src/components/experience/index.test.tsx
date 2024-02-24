import { render, screen } from '@testing-library/react';

import Experience from './index';

describe("correctly returns the experience component", () => {
    it("renders a container", () => {
        render(<Experience />);

        const title = screen.getByText(/job experiences/i);
        expect(title).toBeInTheDocument();
    });
});
