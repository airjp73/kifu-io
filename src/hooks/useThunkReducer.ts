import { useState } from 'react';

/**
 * Implements a very simple, thunk-style reducer
 * to ease dispatching several actions in a row that rely on previous state.
 */
interface Action {
  type: string;
}
type Reducer<S> = (state: S, action: Action) => S;
type Dispatch = (action: Action) => void;
type ActionFunction<S> = (dispatch: Dispatch, state: S) => void;
export type ThunkAction<S> = Action | ActionFunction<S>;
export type ThunkDispatch<S> = (action: ThunkAction<S>) => void;

const useThunkReducer = <S>(
  reducer: Reducer<S>,
  initialState: S
): [S, ThunkDispatch<S>] => {
  const [state, setState] = useState(initialState);

  const thunkDispatch = (action: ThunkAction<S>) => {
    if (typeof action === 'function') {
      setState(prevState => {
        action(thunkDispatch, prevState);
        return prevState;
      });
    } else {
      setState(prevState => reducer(prevState, action));
    }
  };

  return [state, thunkDispatch];
};

export default useThunkReducer;
