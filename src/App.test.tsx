import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';

test("renders project container", () => {
    render(<App />);
    const title = screen.getByText(/side projects/i);
    expect(title).toBeInTheDocument();
});
