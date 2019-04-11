import React from 'react';
import FlatButton from 'components/FlatButton';
import { useTabContext } from './Tabs';

interface ButtonTabProps {
  tabName: string;
  label: string;
}
const ButtonTab: React.FunctionComponent<
  ButtonTabProps & React.ComponentProps<typeof FlatButton>
> = ({ tabName, label, ...rest }) => {
  const { setCurrentTab } = useTabContext();
  return (
    <FlatButton
      key={tabName}
      onClick={() => setCurrentTab(tabName)}
      data-tabid={tabName}
      {...rest}
    >
      {label}
    </FlatButton>
  );
};

export default ButtonTab;
