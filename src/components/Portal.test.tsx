import React from 'react';
import { render } from 'react-testing-library';
import Portal from './Portal';

test('should render', () => {
  const rendered = render(<Portal />);
  expect(rendered).toBeTruthy();
});
