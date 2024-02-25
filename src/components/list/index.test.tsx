import { render, screen } from '@testing-library/react';

import { ListContent } from '../../types';
import List from './index';

describe("correctly returns the list component", () => {
    it("renders title and contents correctly", () => {
        const title = "Test Title";
        const contents = [
            {
                title: "Item 1",
                subTitle: "Subtitle 1",
                duration: "Duration 1",
                descriptions: ["Description 1"],
            },
            {
                title: "Item 2",
                subTitle: "Subtitle 2",
                duration: "Duration 2",
                descriptions: ["Description 2", "Description 3"],
            },
        ];

        render(<List title={title} contents={contents} />);

        expect(screen.getByText(title)).toBeInTheDocument();

        contents.forEach((content) => {
            expect(screen.getByText(content.title)).toBeInTheDocument();
            expect(screen.getByText(content.subTitle)).toBeInTheDocument();
            expect(screen.getByText(content.duration)).toBeInTheDocument();
            content.descriptions.forEach((description) => {
                expect(screen.getAllByText(description)).toHaveLength(1);
            });
        });
    });

    it("renders without crashing with empty contents", () => {
        const title = "Test Title";
        const contents: Array<ListContent> = [];

        render(<List title={title} contents={contents} />);
    });
});
