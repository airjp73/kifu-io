import React from 'react';
import each from 'jest-each';
import { render, fireEvent } from 'react-testing-library';
import sgf1 from 'goban/parseSgf/snapshots/snapshot1';
import sgf2 from 'goban/parseSgf/snapshots/snapshot2';
import sgf3 from 'goban/parseSgf/snapshots/snapshot3';
import { GoGameContextProvider, useGoGameContext } from '../GoGameContext';
import { createStringFromBoardState } from '../boardStateTestHelpers';

const BoardStateTestRenderer = () => {
  const { forward, gameState } = useGoGameContext();
  const boardString = createStringFromBoardState(
    gameState.boardState,
    gameState.properties.boardSize || [19, 19]
  );
  return (
    <div>
      <pre data-testid="boardString">{boardString}</pre>;
      <button data-testid="gotoend" onClick={() => forward(-1)} />
    </div>
  );
};

interface TestGoGameProps {
  sgf: string;
}
const TestGoGame: React.FunctionComponent<TestGoGameProps> = ({ sgf }) => (
  <GoGameContextProvider sgf={sgf}>
    <BoardStateTestRenderer />
  </GoGameContextProvider>
);

describe('Game context snapshots', () => {
  each([['sgf1', sgf1], ['sgf2', sgf2], ['sgf3', sgf3]]).test(
    '%s',
    (desc, sgf) => {
      const game = render(<TestGoGame sgf={sgf} />);
      fireEvent.click(game.getByTestId('gotoend'));
      expect(game.getByTestId('boardString')).toMatchSnapshot();
    }
  );
});
