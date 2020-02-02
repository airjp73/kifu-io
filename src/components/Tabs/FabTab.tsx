import React from 'react';
import { useTabContext } from './Tabs';
import Fab from 'components/Fab';

interface FabTabProps {
  tabName?: string;
}

const FabTab: React.FunctionComponent<FabTabProps &
  React.ComponentProps<typeof Fab>> = ({ tabName, ...rest }) => {
  const { setCurrentTab } = useTabContext();

  return <Fab onClick={() => tabName && setCurrentTab(tabName)} {...rest} />;
};

export default FabTab;
