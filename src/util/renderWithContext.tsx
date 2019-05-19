import React from 'react';
import { render } from 'react-testing-library';
import AppContext from '../AppContext';

const renderWithContext = (child: React.ReactNode) =>
  render(<AppContext>{child}</AppContext>);

export default renderWithContext;
