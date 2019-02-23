import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import SlideOutPanel from './SlideOutPanel';

test('should be on the right if side = "right"', () => {
  const rendered = render(
    <SlideOutPanel active={false} onClose={() => {}} side="right">
      Hi
    </SlideOutPanel>
  );
  const panel = rendered.getByTestId('side-panel');
  const overlay = rendered.getByTestId('side-panel-overlay');
  expect(panel).toHaveStyle('right: 0;');
  expect(panel).toHaveStyle('transform: translateX(20rem);');
  expect(overlay).toHaveStyle('opacity: 0;');
});

test('should be on the left if side = "left"', () => {
  const rendered = render(
    <SlideOutPanel active={false} onClose={() => {}} side="left">
      Hi
    </SlideOutPanel>
  );
  const panel = rendered.getByTestId('side-panel');
  const overlay = rendered.getByTestId('side-panel-overlay');
  expect(panel).toHaveStyle('left: 0;');
  expect(panel).toHaveStyle('transform: translateX(-20rem);');
  expect(overlay).toHaveStyle('opacity: 0;');
});

test('should be visble when active', () => {
  const rendered = render(
    <SlideOutPanel active onClose={() => {}} side="left">
      Hi
    </SlideOutPanel>
  );
  const panel = rendered.getByTestId('side-panel');
  const overlay = rendered.getByTestId('side-panel-overlay');
  expect(panel).toHaveStyle('transform: translateX(0);');
  expect(overlay).toHaveStyle('opacity: 1;');
});

test('should call onClose prop when overlay clicked', () => {
  const onClose = jest.fn();
  const rendered = render(
    <SlideOutPanel active onClose={onClose} side="right">
      Hi
    </SlideOutPanel>
  );
  const overlay = rendered.getByTestId('side-panel-overlay');
  fireEvent.click(overlay);
  expect(onClose).toBeCalledTimes(1);
});
