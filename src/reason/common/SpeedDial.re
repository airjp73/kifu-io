module BaseSpeedDial = {
  [@bs.module "../../components/SpeedDial.tsx"] [@react.component]
  external make:
    (~direction: option(string), ~children: React.element) => React.element =
    "default";
};

[@gentype]
[@bs.deriving jsConverter]
type direction = [
  | [@bs.as "UP"] `Up
  | [@bs.as "DOWN"] `Down
  | [@bs.as "LEFT"] `Left
];

[@gentype]
[@react.component]
let make = (~direction, ~children) => {
  let directionStr =
    switch (direction) {
    | Some(dir) => Some(directionToJs(dir))
    | None => None
    };

  <BaseSpeedDial direction=directionStr> children </BaseSpeedDial>;
};
