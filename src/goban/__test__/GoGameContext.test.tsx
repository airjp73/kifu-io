import React, { useState } from 'react';
import each from 'jest-each';
import { render, fireEvent } from 'react-testing-library';
import sgf1 from 'goban/parseSgf/snapshots/snapshot1';
import sgf2 from 'goban/parseSgf/snapshots/snapshot2';
import sgf3 from 'goban/parseSgf/snapshots/snapshot3';
import useSgf from '../useSgf';
import { GoGameContextProvider, useGoGameContext } from '../GoGameContext';
import { createStringFromBoardState } from '../boardStateTestHelpers';
import { addMove, editPoint } from 'goban/gameTreeActions';
import createSgfFromGameTree from 'goban/parseSgf/createSgfFromGameTree';

const BoardStateTestRenderer = () => {
  const { forward, back, gameState, dispatch } = useGoGameContext();
  const boardString = createStringFromBoardState(
    gameState,
    gameState.properties.boardSize || [19, 19]
  );
  const [point, setPoint] = useState('');
  const doThing: typeof dispatch = action => {
    dispatch(action);
    setPoint('');
  };

  const [generatedSgf, setGeneratedSgf] = useState<string | null>(null);
  return (
    <div>
      <pre data-testid="boardString">{boardString}</pre>;
      <button data-testid="gotobeginning" onClick={() => back(-1)} />
      <button data-testid="back10" onClick={() => back(10)} />
      <button data-testid="back1" onClick={() => back(1)} />
      <button data-testid="forward1" onClick={() => forward(1)} />
      <button data-testid="forward10" onClick={() => forward(10)} />
      <button data-testid="gotoend" onClick={() => forward(-1)} />
      <input
        data-testid="set-point"
        value={point}
        onChange={event => setPoint(event.target.value)}
      />
      <button data-testid="add-move" onClick={() => doThing(addMove(point))} />
      <button
        data-testid="add-b"
        onClick={() => doThing(editPoint(point, 'b'))}
      />
      <button
        data-testid="add-w"
        onClick={() => doThing(editPoint(point, 'w'))}
      />
      <button
        data-testid="create-sgf"
        onClick={() =>
          setGeneratedSgf(createSgfFromGameTree(gameState.gameTree))
        }
      />
      {generatedSgf && <pre data-testid="generated-sgf">{generatedSgf}</pre>}
    </div>
  );
};

interface TestGoGameProps {
  sgf: string;
}
const TestGoGame: React.FunctionComponent<TestGoGameProps> = ({ sgf }) => {
  const [gameTree] = useSgf(sgf);
  return (
    <GoGameContextProvider gameTree={gameTree}>
      <BoardStateTestRenderer />
    </GoGameContextProvider>
  );
};

describe('Game context snapshots', () => {
  each([
    ['sgf1', sgf1],
    ['sgf2', sgf2],
    ['sgf3', sgf3],
  ]).test('should render the final position correctly for %s', (desc, sgf) => {
    const game = render(<TestGoGame sgf={sgf} />);
    fireEvent.click(game.getByTestId('gotoend'));
    expect(game.getByTestId('boardString').textContent).toMatchSnapshot();
  });

  type Instruction = string | [string, string];
  // lists of moves generated randomly
  const sequences: Instruction[][] = [
    [
      'forward10',
      'forward1',
      'forward1',
      'forward1',
      'forward10',
      'back1',
      'forward10',
      'forward1',
      'back10',
      'back10',
      'forward10',
      'back10',
      'forward10',
      'forward10',
      'back1',
      'forward1',
      'forward1',
      'forward1',
      'forward10',
      'back1',
    ],
    [
      'forward1',
      'forward10',
      'forward1',
      'back10',
      'forward10',
      'back10',
      'back1',
      'forward1',
      'forward1',
      'back10',
      'forward1',
      'forward10',
      'forward10',
      'gotoend',
      'forward10',
      'forward10',
      'back1',
      'forward10',
      'forward1',
      'forward10',
    ],
    [
      'back10',
      'back1',
      'gotobeginning',
      'gotobeginning',
      'back10',
      'gotobeginning',
      'forward10',
      'forward10',
      'forward10',
      'back10',
      'back1',
      'forward10',
      'forward1',
      'forward1',
      'forward10',
      'forward10',
      'forward10',
      'back10',
      'back10',
      'forward1',
    ],
    [
      'forward1',
      'gotoend',
      'back1',
      'gotoend',
      'forward1',
      'gotoend',
      'forward1',
      'back10',
      'back10',
      'gotoend',
      'forward1',
      'back10',
      'back10',
      'gotobeginning',
      'forward10',
      'back1',
      'forward10',
      'back1',
      'forward1',
      'back10',
    ],
    [
      'back1',
      'forward1',
      'forward1',
      'back10',
      'back1',
      'back1',
      'forward10',
      'back1',
      'forward10',
      'back1',
      'forward1',
      'back10',
      'back10',
      'gotobeginning',
      'forward10',
      'forward1',
      'forward10',
      'back1',
      'forward10',
      'back10',
      'gotobeginning',
      'forward10',
      'forward1',
      'forward10',
      'forward1',
      'back1',
      'forward10',
      'back1',
      'back10',
      'gotoend',
      'back10',
      'back1',
      'back1',
      'forward1',
      'back1',
      'forward10',
      'forward10',
      'back1',
      'gotobeginning',
      'forward10',
    ],
    [
      'back1',
      'back10',
      'forward10',
      'forward1',
      'back10',
      'forward1',
      'gotoend',
      'back1',
      'forward1',
      'forward1',
      'forward10',
      'forward10',
      'back10',
      'forward1',
      'back1',
      'forward10',
      'back1',
      'forward10',
      'back10',
      'back10',
      'back10',
      'forward1',
      'gotobeginning',
      'back10',
      'forward1',
      'forward10',
      'forward10',
      'forward1',
      'forward1',
      'forward10',
      'forward10',
      'gotobeginning',
      'back1',
      'back1',
      'back10',
      'gotobeginning',
      'forward1',
      'forward10',
      'forward10',
      'forward10',
    ],
    [
      'forward10',
      'forward10',
      'forward10',
      ['add-move', 'ol'],
      ['add-w', 'oh'],
      ['add-b', 'nf'],
      ['add-move', 'fi'],
      ['add-w', 'cq'],
      ['add-move', 'bg'],
      ['add-move', 'jo'],
      ['add-b', 'fp'],
      ['add-b', 'no'],
      ['add-w', 'ml'],
      ['add-move', 'qn'],
      ['add-move', 'fh'],
      ['add-move', 'eq'],
      ['add-b', 'iq'],
      ['add-b', 'fp'],
      ['add-w', 'em'],
      ['add-b', 'hq'],
      ['add-move', 'og'],
      ['add-b', 'di'],
      ['add-w', 'mn'],
      'back1',
      'forward1',
      'back10',
      'forward10',
    ],
  ];

  const cases = sequences
    .map((sequence, index) => [
      [index, 'sgf1', sgf1],
      [index, 'sgf2', sgf2],
      [index, 'sgf3', sgf3],
    ])
    // flatMap causes issues 🤷‍♀️
    .reduce((flattened, current) => [...flattened, ...current], []);

  each(cases).test(
    'should perform sequence %d correctly for %s',
    async (sequenceIndex, desc, sgf) => {
      const sequence = sequences[sequenceIndex];
      const game = render(<TestGoGame sgf={sgf} />);
      let hasTreeMods = false;
      sequence.forEach(instruction => {
        if (typeof instruction === 'string') {
          fireEvent.click(game.getByTestId(instruction));
        } else {
          hasTreeMods = true;
          fireEvent.change(game.getByTestId('set-point'), {
            target: { value: instruction[1] },
          });
          fireEvent.click(game.getByTestId(instruction[0]));
        }
      });
      expect(game.getByTestId('boardString').textContent).toMatchSnapshot();

      if (hasTreeMods) {
        fireEvent.click(game.getByTestId('create-sgf'));
        expect(
          (await game.findByTestId('generated-sgf')).textContent
        ).toMatchSnapshot();
      }
    }
  );

  each([
    ['sgf1', sgf1],
    ['sgf2', sgf2],
    ['sgf3', sgf3],
  ]).test('should render move 50 correctly for %s', (desc, sgf) => {
    const game = render(<TestGoGame sgf={sgf} />);
    fireEvent.click(game.getByTestId('forward10'));
    fireEvent.click(game.getByTestId('forward10'));
    fireEvent.click(game.getByTestId('forward10'));
    fireEvent.click(game.getByTestId('forward10'));
    fireEvent.click(game.getByTestId('forward10'));
    expect(game.getByTestId('boardString').textContent).toMatchSnapshot();
  });

  each([
    ['sgf1', sgf1],
    ['sgf2', sgf2],
    ['sgf3', sgf3],
  ]).test(
    'should render 50 moves from the end correctly for %s',
    (desc, sgf) => {
      const game = render(<TestGoGame sgf={sgf} />);
      fireEvent.click(game.getByTestId('gotoend'));
      fireEvent.click(game.getByTestId('back10'));
      fireEvent.click(game.getByTestId('back10'));
      fireEvent.click(game.getByTestId('back10'));
      fireEvent.click(game.getByTestId('back10'));
      fireEvent.click(game.getByTestId('back10'));
      expect(game.getByTestId('boardString').textContent).toMatchSnapshot();
    }
  );
});
