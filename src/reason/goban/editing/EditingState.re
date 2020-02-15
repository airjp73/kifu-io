[@gentype]
type tool =
  | AddMove
  | AddStone(GobanVariants.stoneColor);

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
