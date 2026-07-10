import { fireEvent, render, screen } from "@testing-library/react";

import GlassButton from "./index";

describe("correctly returns the glass button component", () => {
    it("renders an accessible button and fires the click handler", () => {
        const onClick = jest.fn();
        render(
            <GlassButton label="Next" onClick={onClick}>
                ›
            </GlassButton>
        );

        const button = screen.getByLabelText("Next");
        expect(button).toHaveTextContent("›");
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("is visible by default and hidden on mobile when requested", () => {
        render(
            <>
                <GlassButton label="Always" onClick={() => {}}>
                    +
                </GlassButton>
                <GlassButton label="Wide only" onClick={() => {}} hideOnMobile>
                    ‹
                </GlassButton>
            </>
        );

        expect(screen.getByLabelText("Always")).toHaveClass("grid");
        expect(screen.getByLabelText("Wide only")).toHaveClass(
            "hidden",
            "wide:grid"
        );
    });
});
