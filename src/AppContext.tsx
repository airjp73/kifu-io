import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WindowContextProvider from 'WindowContext';

const AppContext: React.FunctionComponent = ({ children }) => (
  <BrowserRouter>
    <WindowContextProvider>{children}</WindowContextProvider>
  </BrowserRouter>
);

export default AppContext;
