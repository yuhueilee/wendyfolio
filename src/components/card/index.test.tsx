import { render, screen } from '@testing-library/react';

import { CardContent } from '../../types';
import CardItem from './index';

describe("correctly returns the card item component", () => {
    it("renders card items correctly", () => {
        const contentList: Array<CardContent> = [
            {
                img: "image1.jpg",
                title: "Title 1",
                description: "Description 1",
                links: ["Link 1", "Link 2"],
            },
            {
                img: "image2.jpg",
                title: "Title 2",
                description: "Description 2",
                links: ["Link 3", "Link 4"],
            },
        ];

        render(<CardItem contentList={contentList} />);

        // Check if titles and descriptions are rendered
        contentList.forEach((content) => {
            expect(screen.getAllByText(content.title)).toHaveLength(1);
            expect(screen.getAllByText(content.description)).toHaveLength(1);
        });

        // Check if images are rendered
        const images = screen.getAllByRole("img");
        contentList.forEach((content, index) => {
            expect(images[index]).toHaveAttribute("src", content.img);
        });
    });
});
