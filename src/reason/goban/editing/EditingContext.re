[@gentype]
type contextType = (EditingState.stateType, EditingState.dispatchType);

let defaultContext: contextType = (
  {unsavedChanges: false, tool: AddMove},
  (action: EditingState.actionType) => (),
);

[@gentype]
let context = React.createContext(defaultContext);

[@gentype]
let use = () => React.useContext(context);

[@gentype]
let makeProps = (~value, ~children, ()) => {
  "value": value,
  "children": children,
};

[@gentype]
let make = React.Context.provider(context);
