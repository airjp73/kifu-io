import React from 'react';
import { render } from 'react-testing-library';
import FontIcon from '../FontIcon';

test('should render a span with the `material-icons` class and any provided classes', () => {
  const rendered = render(<FontIcon icon="person" className="test-class" />);
  const icon = rendered.getByText('person');
  expect(icon.classList).toContain('material-icons');
  expect(icon.classList).toContain('test-class');
});
