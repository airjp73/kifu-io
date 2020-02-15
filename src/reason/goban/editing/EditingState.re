[@gentype]
type stoneColor =
  | Black
  | White;

[@gentype]
type tool =
  | AddMove
  | AddStone(stoneColor);

[@gentype]
type stateType = {tool};

[@gentype]
type actionType =
  | SetTool(tool);

[@gentype]
type dispatchType = actionType => unit;

[@gentype]
let reducer = (state, action) =>
  switch (action) {
  | SetTool(tool) => {...state, tool}
  };
