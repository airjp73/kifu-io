import 'jest-dom/extend-expect';
import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';

import HelloPage from './index';

afterEach(cleanup);

test('button increments count', () => {
  const rendered = render(<HelloPage />);
  const button = rendered.getByText('Testing!');
  const count = rendered.getByTestId('countDisplay');
  const increment = () => fireEvent.click(button);

  expect(count.textContent).toBe('0');
  increment();
  expect(count.textContent).toBe('1');
  increment();
  expect(count.textContent).toBe('2');
  increment();
  expect(count.textContent).toBe('3');
});
