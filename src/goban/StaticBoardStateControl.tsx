import React, { useEffect, useState } from 'react';
import { useGoGameContext } from 'goban/GoGameContext';

interface StaticBoardStateControlProps {
  moveNumber: number;
}

const StaticBoardStateControl: React.FunctionComponent<
  StaticBoardStateControlProps
> = ({ moveNumber }) => {
  const { back, forward } = useGoGameContext();

  useEffect(() => {
    forward(moveNumber);
    return () => back(-1);
  }, [moveNumber]);

  return null;
};

export default StaticBoardStateControl;
