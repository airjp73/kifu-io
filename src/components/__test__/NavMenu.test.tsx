import React from 'react';
import renderWithContext from 'util/renderWithContext';
import NavMenu from '../NavMenu';

test('should render', () => {
  const rendered = renderWithContext(<NavMenu />);
  expect(rendered).toBeTruthy();
});
