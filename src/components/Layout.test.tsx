import React from 'react';
import { fireEvent, render, wait } from 'react-testing-library';
import Layout from './Layout';

test('should open slide-out panel on menu click and close on overlay click', async () => {
  const rendered = render(<Layout />);

  expect(rendered.queryByTestId('slide-out-panel')).not.toBeInTheDocument();
  expect(
    rendered.queryByTestId('slide-out-panel-overlay')
  ).not.toBeInTheDocument();

  fireEvent.click(rendered.getByText('menu'));
  expect(rendered.getByTestId('slide-out-panel')).toBeInTheDocument();

  fireEvent.click(rendered.getByTestId('slide-out-panel-overlay'));
  await wait(
    () =>
      expect(rendered.queryByTestId('slide-out-panel')).not.toBeInTheDocument(),
    { timeout: 500 }
  );
});
