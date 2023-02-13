import React from 'react';
import { render } from '@testing-library/react';
import { MainLayout } from '../MainLayout';

describe('MainLayout', () => {
  it('renders without errors', () => {
    const { container } = render(<MainLayout />);
    expect(container).toBeTruthy();
  });
});