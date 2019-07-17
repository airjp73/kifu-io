import React from 'react';
import { useGoGameContext } from 'goban/GoGameContext';
import { ChevronLeft } from 'react-feather';
import FlatButton from '../components/FlatButton';
import { dark } from 'style';

const BackButton: React.FunctionComponent<
  React.ComponentProps<typeof FlatButton>
> = props => {
  const { back } = useGoGameContext();

  return (
    <FlatButton onClick={() => back(1)} {...props}>
      <ChevronLeft height="3rem" width="3rem" color={dark} />
    </FlatButton>
  );
};

export default BackButton;
