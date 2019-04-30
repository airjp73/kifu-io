import React from 'react';
import { render } from 'react-testing-library';
import NavMenu from '../NavMenu';

test('should render', () => {
  const rendered = render(<NavMenu />);
  expect(rendered).toBeTruthy();
});
