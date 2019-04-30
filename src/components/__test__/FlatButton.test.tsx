import React from 'react';
import { render } from 'react-testing-library';
import FlatButton from '../FlatButton';

test('should render children in a button', () => {
  const rendered = render(<FlatButton>Testing</FlatButton>);
  expect(rendered.getByText('Testing').tagName).toBe('BUTTON');
});

test('should provided icon', () => {
  const rendered = render(<FlatButton leftIcon="person">Testing</FlatButton>);
  expect(rendered.queryByText('person')).toBeInTheDocument();
});
