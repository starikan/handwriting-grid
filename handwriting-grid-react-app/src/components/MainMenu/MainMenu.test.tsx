import React from 'react';
import { render } from '@testing-library/react';
import MainMenu from '.';


describe("MainMenu", () => {
  it("should match snapshot", () => {
    const { getByText } = render(<MainMenu />);
    const linkElement = getByText(/MainMenu works!/i);
    expect(linkElement).toBeInTheDocument();
  });
});