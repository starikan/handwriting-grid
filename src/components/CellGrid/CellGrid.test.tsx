import React from 'react';
import { render } from '@testing-library/react';
import CellGrid from '.';

describe('CellGrid', () => {
  it('should match snapshot', () => {
    const cell = {
      width: 100,
      height: 100,
      border: { top: 1, left: 1, right: 1, bottom: 1 },
    };
    const { getByText } = render(<CellGrid cell={cell} />);
    const linkElement = getByText(/Grid works!/i);
    expect(linkElement).toBeInTheDocument();
  });
});
