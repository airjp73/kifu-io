[@gentype]
type stoneColor =
  | Black
  | White;

[@gentype]
type tool =
  | AddMove
  | AddStone(stoneColor);

[@gentype]
type stateType = {
  unsavedChanges: bool,
  tool,
};

[@gentype]
type actionType =
  | ChangesMade
  | ChangesSaved;

[@gentype]
type dispatchType = actionType => unit;

[@gentype]
let reducer = (state, action) =>
  switch (action) {
  | ChangesMade => {...state, unsavedChanges: true}
  | ChangesSaved => {...state, unsavedChanges: false}
  };
