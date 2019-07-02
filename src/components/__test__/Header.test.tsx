import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import Header from '../Header';

test('should call onMenuClick when menu button clicked', () => {
  const onMenuClick = jest.fn();
  const rendered = render(<Header onMenuClick={onMenuClick} />);
  const menuButton = rendered.getByTestId('slide-out-menu-button');
  fireEvent.click(menuButton);
  expect(onMenuClick).toHaveBeenCalledTimes(1);
});
