import React from 'react';
import { render } from '@testing-library/react';
import PageMenuButton from '.';


describe("PageMenuButton", () => {
  it("should match snapshot", () => {
    const { getByText } = render(<PageMenuButton />);
    const linkElement = getByText(/PageMenuButton works!/i);
    expect(linkElement).toBeInTheDocument();
  });
});