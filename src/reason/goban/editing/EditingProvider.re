[@gentype]
[@react.component]
let make = (~children: React.element) => {
  let (state, dispatch) =
    React.useReducer(EditingState.reducer, {tool: AddMove});

  let value: EditingContext.contextType =
    React.useMemo2(() => (state, dispatch), (state, dispatch));

  <EditingContext value> children </EditingContext>;
};
