module BaseSpeedDialOption = {
  [@bs.module "../../components/SpeedDialOption.tsx"] [@react.component]
  external make:
    (
      ~label: string,
      ~children: React.element,
      ~labelAbove: option(bool),
      ~highlighted: option(bool),
      ~size: option(string)
    ) =>
    React.element =
    "default";
};

[@gentype]
type size =
  | Medium
  | Small;

[@gentype]
[@react.component]
let make = (~size, ~children, ~label, ~labelAbove, ~highlighted) => {
  let sizeStr =
    switch (size) {
    | Some(Medium) => Some("MEDIUM")
    | Some(Small) => Some("SMALL")
    | None => None
    };

  <BaseSpeedDialOption size=sizeStr label labelAbove highlighted>
    children
  </BaseSpeedDialOption>;
};
