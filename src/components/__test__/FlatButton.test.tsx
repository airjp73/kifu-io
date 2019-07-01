import React from 'react';
import { render } from 'react-testing-library';
import FlatButton from '../FlatButton';

test('should provided icon', () => {
  const rendered = render(
    <FlatButton leftIcon={<p>person</p>}>Testing</FlatButton>
  );
  expect(rendered.queryByText('person')).toBeInTheDocument();
});
