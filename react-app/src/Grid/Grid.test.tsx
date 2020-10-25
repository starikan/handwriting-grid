import React from 'react';
import { render } from '@testing-library/react';
import Grid from '.';


describe("Grid", () => {
  it("should match snapshot", () => {
    const { getByText } = render(<Grid />);
    const linkElement = getByText(/Grid works!/i);
    expect(linkElement).toBeInTheDocument();
  });
});