module BaseSpeedDial = {
  [@bs.module "../../components/SpeedDial.tsx"] [@react.component]
  external make:
    (
      ~direction: option(string),
      ~children: React.element,
      ~icon: React.element=?,
      ~flowDirection: string=?
    ) =>
    React.element =
    "default";
};

[@gentype]
[@bs.deriving jsConverter]
type direction = [
  | [@bs.as "UP"] `Up
  | [@bs.as "DOWN"] `Down
  | [@bs.as "LEFT"] `Left
  | [@bs.as "RIGHT"] `Right
];

[@gentype]
[@react.component]
let make = (~direction, ~children, ~flowDirection=?, ~icon=?) => {
  let directionStr =
    switch (direction) {
    | Some(dir) => Some(directionToJs(dir))
    | None => None
    };

  <BaseSpeedDial direction=directionStr ?flowDirection ?icon>
    children
  </BaseSpeedDial>;
};
