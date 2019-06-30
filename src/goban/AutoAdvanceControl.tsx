import React, { useEffect, useState } from 'react';
import FontIcon from 'components/FontIcon';
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
      <FontIcon icon={autoAdvance ? 'pause' : 'play_arrow'} />
    </FlatButton>
  );
};

export default AutoAdvanceControl;
