import { render, screen } from '@testing-library/react';

import CardItem from './index';

test("renders project container", () => {
    const contentList = [
        {
            img: "https://project1.png",
            title: "project 1",
            description: "react project",
        },
    ];
    render(CardItem(contentList));
    const title = screen.getByText(/project 1/i);
    expect(title).toBeInTheDocument();
    const description = screen.getByText(/react project/i);
    expect(description).toBeInTheDocument();
});
