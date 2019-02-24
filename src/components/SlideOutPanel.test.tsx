import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import SlideOutPanel from './SlideOutPanel';

test('should be on the right if side = "right"', () => {
  const rendered = render(
    <SlideOutPanel active onClose={() => {}} side="right" />
  );
  const panel = rendered.getByTestId('side-panel');
  expect(panel).toHaveStyle('right: 0;');
});

test('should be on the left if side = "left"', () => {
  const rendered = render(
    <SlideOutPanel active onClose={() => {}} side="left" />
  );
  const panel = rendered.getByTestId('side-panel');
  expect(panel).toHaveStyle('left: 0;');
});

test('should not be visible when not active', () => {
  const rendered = render(
    <SlideOutPanel active={false} onClose={() => {}} side="left" />
  );
  const panel = rendered.queryByTestId('side-panel');
  const overlay = rendered.queryByTestId('side-panel-overlay');
  expect(panel).toBeFalsy();
  expect(overlay).toBeFalsy();
});

test('should call onClose prop when overlay clicked', () => {
  const onClose = jest.fn();
  const rendered = render(
    <SlideOutPanel active onClose={onClose} side="right" />
  );
  const overlay = rendered.getByTestId('side-panel-overlay');
  fireEvent.click(overlay);
  expect(onClose).toHaveBeenCalledTimes(1);
});
