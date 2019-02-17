import React, { useState } from 'react';
import styled from 'styled-components';

interface CounterProps {
  count: number;
  onInc: () => void;
}

const Counter: React.FunctionComponent<CounterProps> = ({ count, onInc }) => (
  <>
    <span data-testid="countDisplay">{count}</span>
    <button onClick={onInc}>Testing!</button>
  </>
);

interface HelloProps {
  isBlue: boolean;
}

const Hello = styled.p`
  color: ${({ isBlue }: HelloProps) => isBlue ? 'blue' : 'red'};
`;

const HelloPage: React.FunctionComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Hello isBlue={!!(count % 2)}>Hello!</Hello>
      <Counter count={count} onInc={() => setCount(prevCount => prevCount + 1)} />
    </>
  );
};

export default HelloPage;
