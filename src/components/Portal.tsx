import React from 'react';
import { createPortal } from 'react-dom';

const Portal: React.FunctionComponent = ({ children }) =>
  document.body && createPortal(children, document.body);

export default Portal;
