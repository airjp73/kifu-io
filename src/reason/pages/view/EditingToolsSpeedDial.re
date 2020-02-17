[@gentype]
[@react.component]
let make = (~direction) => {
  let (state, dispatch) = EditingContext.useEditingContext();

  <SpeedDial
    direction={Some(direction)}
    icon={
      switch (state.tool) {
      | AddMove => <GoIcon width="1.5rem" height="1.5rem" />
      | AddStone(`Black) => <GoIcon.BlackStone radius=13 />
      | AddStone(`White) => <GoIcon.WhiteStone radius=13 />
      }
    }>
    <SetToolOptions.Play />
    <SetToolOptions.BlackStone />
    <SetToolOptions.WhiteStone />
  </SpeedDial>;
};
