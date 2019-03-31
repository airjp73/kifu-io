import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useTabContext } from './Tabs';

const TabContentArea = styled.div`
  flex: 1;
`;

interface TabContentProps {
  tab: string;
}

const TabContent: React.FunctionComponent<TabContentProps> = ({
  children,
  tab,
}) => {
  const { currentTab } = useTabContext();
  return currentTab === tab && <TabContentArea>{children}</TabContentArea>;
};

export default TabContent;
