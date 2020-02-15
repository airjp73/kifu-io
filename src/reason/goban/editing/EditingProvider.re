[@gentype]
[@react.component]
let provider = (~children: React.element) => {
  let (state, dispatch) =
    React.useReducer(
      EditingState.reducer,
      {unsavedChanges: false, tool: AddMove},
    );

  let value: EditingContext.contextType =
    React.useMemo2(() => (state, dispatch), (state, dispatch));

  <EditingContext value> children </EditingContext>;
};
