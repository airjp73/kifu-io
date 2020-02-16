[@gentype]
type junk = {junk: string};

[@bs.module "../../components/SpeedDialOption.tsx"] [@react.component]
external make:
  (
    ~label: string,
    ~children: React.element,
    ~onClick: ReactEvent.Mouse.t => unit,
    ~labelAbove: bool=?,
    ~highlighted: bool=?,
    ~style: junk=?
  ) =>
  React.element =
  "default";
