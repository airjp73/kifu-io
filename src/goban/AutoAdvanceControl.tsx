import React, { useEffect, useState } from 'react';
import { Play, Pause } from 'react-feather';
import FlatButton from 'components/FlatButton';
import { useGoGameContext } from 'goban/GoGameContext';

interface AutoAdvanceControlProps {
  playByDefault?: boolean;
}

const AutoAdvanceControl: React.FunctionComponent<AutoAdvanceControlProps> = ({
  playByDefault = false,
}) => {
  const [autoAdvance, setAutoAdvance] = useState(playByDefault);
  const { forward } = useGoGameContext();

  useEffect(() => {
    if (!autoAdvance) return;
    const interval = setInterval(() => forward(1), 500);
    return () => clearInterval(interval);
  }, [autoAdvance, forward]);

  return (
    <FlatButton onClick={() => setAutoAdvance(prev => !prev)}>
      {autoAdvance ? (
        <Pause fill="currentColor" />
      ) : (
        <Play fill="currentColor" />
      )}
    </FlatButton>
  );
};

export default AutoAdvanceControl;
