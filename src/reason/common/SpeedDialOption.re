[@gentype]
type junk = {junk: string};

[@gentype]
[@bs.deriving jsConverter]
type labelDirection = [ | [@bs.as "RIGHT"] `Right | [@bs.as "LEFT"] `Left];

[@bs.module "../../components/SpeedDialOption.tsx"] [@react.component]
external make:
  (
    ~label: string,
    ~children: React.element,
    ~onClick: ReactEvent.Mouse.t => unit,
    ~highlighted: bool=?,
    ~labelDirection: labelDirection=?,
    ~style: junk=?
  ) =>
  React.element =
  "default";
