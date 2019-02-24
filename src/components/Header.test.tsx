import React from 'react';
import { fireEvent, render, RenderResult } from 'react-testing-library';
import Header from './Header';

const onMenuClick = jest.fn();
let rendered: RenderResult;

beforeEach(() => {
  rendered = render(
    <Header onMenuClick={onMenuClick} />
  );
  onMenuClick.mockClear();
});

test('should render children', () => {
  const child = rendered.getByText('Child');
  expect(child.tagName).toBe('SPAN');
});

test('should call onMenuClick when menu button clicked', () => {
  const menuButton = rendered.getByText('menu');
  fireEvent.click(menuButton);
  expect(onMenuClick).toHaveBeenCalledTimes(1);
});
