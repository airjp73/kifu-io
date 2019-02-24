import React from 'react';
import { fireEvent, render, RenderResult } from 'react-testing-library';
import Header from './Header';

test('should call onMenuClick when menu button clicked', () => {
  const onMenuClick = jest.fn();
  const rendered = render(<Header onMenuClick={onMenuClick} />);
  const menuButton = rendered.getByText('menu');
  fireEvent.click(menuButton);
  expect(onMenuClick).toHaveBeenCalledTimes(1);
});
