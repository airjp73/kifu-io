import React from 'react';
import FlatButton from 'components/FlatButton';
import { useTabContext } from './Tabs';

interface ButtonTabProps {
  className?: string;
  tabName: string;
  label: string;
}
const ButtonTab: React.FunctionComponent<
  ButtonTabProps & React.ComponentProps<typeof FlatButton>
> = ({ className, tabName, label, ...rest }) => {
  const { setCurrentTab } = useTabContext();
  return (
    <FlatButton
      className={className}
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
