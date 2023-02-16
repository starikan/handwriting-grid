import React from 'react';
import { render } from '@testing-library/react';
import AddFirstPageButton from '.';


describe("AddFirstPageButton", () => {
  it("should match snapshot", () => {
    const { getByText } = render(<AddFirstPageButton />);
    const linkElement = getByText(/AddFirstPageButton works!/i);
    expect(linkElement).toBeInTheDocument();
  });
});