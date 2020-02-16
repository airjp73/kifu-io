module BaseSpeedDial = {
  [@bs.module "../../components/SpeedDial.tsx"] [@react.component]
  external make:
    (~direction: option(string), ~children: React.element) => React.element =
    "default";
};

[@gentype]
type direction =
  | Up
  | Down
  | Left;

[@gentype]
[@react.component]
let make = (~direction, ~children) => {
  let directionStr: option(string) =
    switch (direction) {
    | Some(Up) => Some("UP")
    | Some(Down) => Some("DOWN")
    | Some(Left) => Some("LEFT")
    | None => None
    };

  <BaseSpeedDial direction=directionStr> children </BaseSpeedDial>;
};
