[@gentype]
[@react.component]
let make = (~direction) =>
  <SpeedDial direction={Some(direction)}>
    <SetToolOptions.Play />
    <SetToolOptions.BlackStone />
    <SetToolOptions.WhiteStone />
  </SpeedDial>;
