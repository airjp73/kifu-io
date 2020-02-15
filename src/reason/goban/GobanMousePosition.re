[@gentype]
type mousePosition = {
  x: int,
  y: int,
};

[@gentype]
type mousePositionProps = {
  onMouseMove: ReactEvent.Mouse.t => unit,
  onMouseLeave: ReactEvent.Mouse.t => unit,
  onClick: ReactEvent.Mouse.t => unit,
};

[@gentype]
let useMousePosition =
    (coordToPointIndex: int => int, onClick: mousePosition => unit) => {
  let (mousePosition, setMousePosition) = React.useState(() => None);

  let getPos = event => {
    let nativeEvent = ReactEvent.Mouse.nativeEvent(event);
    {
      x: coordToPointIndex(nativeEvent##offsetX),
      y: coordToPointIndex(nativeEvent##offsetY),
    };
  };

  let handleMouseMove = event => {
    let newPos = getPos(event);
    let positionChanged = ({x, y}) => x != newPos.x || y != newPos.y;

    switch (mousePosition) {
    | None => setMousePosition(_ => Some(newPos))
    | Some(pos) when positionChanged(pos) =>
      setMousePosition(_ => Some(newPos))
    | _ => ()
    };
  };

  let handleMouseLeave = _ => setMousePosition(_ => None);

  let handleClick = event => event->getPos->onClick;

  (
    mousePosition,
    {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
    },
  );
};
