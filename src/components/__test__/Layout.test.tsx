import React from 'react';
import { fireEvent, wait } from 'react-testing-library';
import renderWithContext from 'util/renderWithContext';
import Layout from '../Layout';

jest.mock('components/MediaQueryView.tsx', () => {
  const mock: React.FunctionComponent = ({ children }) => <>{children}</>;
  return {
    __esModule: true,
    default: mock,
    LandscapeView: mock,
    PortraitView: mock,
  };
});

test('should open slide-out panel on menu click and close on overlay click', async () => {
  const rendered = renderWithContext(<Layout />);
  await wait();

  expect(rendered.queryByTestId('slide-out-panel')).not.toBeInTheDocument();
  expect(
    rendered.queryByTestId('slide-out-panel-overlay')
  ).not.toBeInTheDocument();

  fireEvent.click(await rendered.findByTestId('slide-out-menu-button'));
  expect(await rendered.findByTestId('slide-out-panel')).toBeInTheDocument();

  fireEvent.click(await rendered.findByTestId('slide-out-panel-overlay'));
  await wait(
    () =>
      expect(rendered.queryByTestId('slide-out-panel')).not.toBeInTheDocument(),
    { timeout: 500 }
  );
  await wait();
});
