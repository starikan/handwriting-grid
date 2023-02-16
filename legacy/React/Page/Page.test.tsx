import React from 'react';
import { render } from '@testing-library/react';
import Page from '.';


describe("Page", () => {
  it("should match snapshot", () => {
    const { getByText } = render(<Page />);
    const linkElement = getByText(/Page works!/i);
    expect(linkElement).toBeInTheDocument();
  });
});