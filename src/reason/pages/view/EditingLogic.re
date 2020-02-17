[@gentype]
let getCurrentStone =
    (
      playerToPlay: option(GobanVariants.stoneColor),
      tool: EditingState.tool,
      blackStone,
      whiteStone,
    ) =>
  switch (playerToPlay, tool) {
  | (Some(`Black), AddMove) => blackStone
  | (Some(`White), AddMove) => whiteStone
  | (None, AddMove) => blackStone
  | (_, AddStone(`Black)) => blackStone
  | (_, AddStone(`White)) => whiteStone
  };
