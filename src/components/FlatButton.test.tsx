import React from 'react';
import { render } from 'react-testing-library';
import FlatButton from './FlatButton';

test('should render a button', () => {
  const rendered = render(<FlatButton>Testing</FlatButton>);
  expect(rendered.getByText('Testing').tagName).toBe('BUTTON');
});