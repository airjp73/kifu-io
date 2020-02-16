[@gentype]
[@react.component]
let make = (~direction) =>
  <SpeedDial direction={Some(direction)}>
    <SetToolOptions.BlackStone />
    <SetToolOptions.WhiteStone />
  </SpeedDial>;
