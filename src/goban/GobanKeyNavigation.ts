import React from 'react';
import useGlobalKeyListener, {
  KEY_CODES,
  Modifiers,
} from 'hooks/useGlobalKeyListener';
import { useGoGameContext } from './GoGameContext';

const GobanKeyNavigation: React.FC = () => {
  const { forward, back } = useGoGameContext();

  const getAmount = (mods: Modifiers) => {
    if (mods.ctrl) return -1;
    else if (mods.shift) return 10;
    else return 1;
  };

  useGlobalKeyListener(KEY_CODES.right, mods => forward(getAmount(mods)));
  useGlobalKeyListener(KEY_CODES.left, mods => back(getAmount(mods)));

  return null;
};

export default GobanKeyNavigation;
