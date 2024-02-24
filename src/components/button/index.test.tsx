import { render, screen } from '@testing-library/react';

import ButtonItem from './index';

describe("correctly returns the button component", () => {
    it("renders buttons with correct links and icons", () => {
        const links = ["https://github.com", "https://example.com"];
        render(<ButtonItem links={links} />);

        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(links.length);

        buttons.forEach((button, index) => {
            expect(button).toHaveAttribute("href", links[index]);
        });

        const githubIcon = 'Link <i class="bi bi-github"></i>';
        const defaultIcon = 'Link <i class="bi bi-box-arrow-up-right"></i>';
        expect(buttons[0].innerHTML).toEqual(githubIcon);
        expect(buttons[1].innerHTML).toEqual(defaultIcon);
    });

    it("renders buttons with default icon for unknown links", () => {
        const links = ["https://example.com", "https://example.org"];
        render(<ButtonItem links={links} />);

        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(links.length);

        buttons.forEach((button) => {
            expect(button.innerHTML).toEqual(
                'Link <i class="bi bi-box-arrow-up-right"></i>'
            );
        });
    });
});
