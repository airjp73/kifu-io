module BlackStone = {
  [@gentype]
  [@react.component]
  let make = (~style=?) => {
    let (state, dispatch) = EditingContext.useEditingContext();

    let handleClick = _ => {
      dispatch(SetTool(AddStone(Black)));
      ();
    };

    let highlighted =
      switch (state.tool) {
      | AddStone(Black) => true
      | _ => false
      };

    <SpeedDialOption
      label="Add Black Stone" onClick=handleClick highlighted ?style>
      <ReactFeather.Edit2 />
    </SpeedDialOption>;
  };
};

module WhiteStone = {
  [@gentype]
  [@react.component]
  let make = (~style=?) => {
    let (state, dispatch) = EditingContext.useEditingContext();

    let handleClick = _ => {
      dispatch(SetTool(AddStone(White)));
      ();
    };

    let highlighted =
      switch (state.tool) {
      | AddStone(White) => true
      | _ => false
      };

    <SpeedDialOption
      label="Add White Stone" onClick=handleClick highlighted ?style>
      <ReactFeather.Edit2 />
    </SpeedDialOption>;
  };
};

module Play = {
  [@gentype]
  [@react.component]
  let make = (~style=?) => {
    let (state, dispatch) = EditingContext.useEditingContext();

    let handleClick = _ => {
      dispatch(SetTool(AddMove));
      ();
    };

    let highlighted =
      switch (state.tool) {
      | AddMove => true
      | _ => false
      };

    <SpeedDialOption label="Play" onClick=handleClick highlighted ?style>
      <GoIcon height="auto" width="auto" />
    </SpeedDialOption>;
  };
};
