[@gentype]
type stoneColor =
  | Black
  | White;

let jsFromStoneColor = color =>
  switch (color) {
  | Black => "b"
  | White => "w"
  };
