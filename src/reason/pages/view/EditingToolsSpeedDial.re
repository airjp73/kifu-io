[@gentype]
[@react.component]
let make = (~direction) =>
  <SpeedDial direction={Some(direction)} icon={<ReactFeather.Edit2 />}>
    <SetToolOptions.Play />
    <SetToolOptions.BlackStone />
    <SetToolOptions.WhiteStone />
  </SpeedDial>;
