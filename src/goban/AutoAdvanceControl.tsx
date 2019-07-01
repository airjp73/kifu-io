import React, { useEffect, useState } from 'react';
import { ReactComponent as PlayIcon } from 'svg/play.svg';
import { ReactComponent as PauseIcon } from 'svg/pause.svg';
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
      {autoAdvance ? <PauseIcon /> : <PlayIcon fill="currentColor" />}
    </FlatButton>
  );
};

export default AutoAdvanceControl;
