import React, { useEffect } from 'react';
import { useGoGameContext } from 'goban/GoGameContext';

interface StaticBoardStateControlProps {
  moveNumber: number;
}

const StaticBoardStateControl: React.FunctionComponent<StaticBoardStateControlProps> = ({
  moveNumber,
}) => {
  const { back, forward } = useGoGameContext();

  // This breaks if we depend on back and forward
  useEffect(() => {
    forward(moveNumber);
    return () => back(-1);
  }, [moveNumber]); // eslint-disable-line

  return null;
};

export default StaticBoardStateControl;
