import React from 'react';
import { render } from '@testing-library/react';
import Block from '.';


describe("Block", () => {
  it("should match snapshot", () => {
    const { getByText } = render(<Block />);
    const linkElement = getByText(/Block works!/i);
    expect(linkElement).toBeInTheDocument();
  });
});