import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const AppContext: React.FunctionComponent = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

export default AppContext;
