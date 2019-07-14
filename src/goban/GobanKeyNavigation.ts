import React from 'react';
import useGlobalKeyListener, { KEY_CODES } from 'hooks/useGlobalKeyListener';
import { useGoGameContext } from './GoGameContext';

const GobanKeyNavigation: React.FC = () => {
  const { forward, back } = useGoGameContext();
  useGlobalKeyListener(KEY_CODES.right, () => forward(1));
  useGlobalKeyListener(KEY_CODES.left, () => back(1));

  return null;
};

export default GobanKeyNavigation;
