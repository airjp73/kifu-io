[@bs.module "../../components/GoIcon.tsx"] [@react.component]
external make: (~height: string, ~width: string) => React.element = "default";

module BlackStone = {
  [@bs.module "../../components/BlackStoneIcon.tsx"] [@react.component]
  external make: (~radius: int) => React.element = "default";
};

module WhiteStone = {
  [@bs.module "../../components/WhiteStoneIcon.tsx"] [@react.component]
  external make: (~radius: int) => React.element = "default";
};
