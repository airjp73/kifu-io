import React from 'react';
import { useGoGameContext } from 'goban/GoGameContext';
import { ChevronRight } from 'react-feather';
import FlatButton from '../components/FlatButton';
import { dark } from 'style';

const ForwardButton: React.FunctionComponent<
  React.ComponentProps<typeof FlatButton>
> = props => {
  const { forward } = useGoGameContext();

  return (
    <FlatButton onClick={() => forward(1)} {...props}>
      <ChevronRight height="3rem" width="3rem" color={dark} />
    </FlatButton>
  );
};

export default ForwardButton;
