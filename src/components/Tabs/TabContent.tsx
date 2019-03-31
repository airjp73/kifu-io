import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useTabContext } from './Tabs';
import posed from 'react-pose';

const TabContentArea = styled.div`
  flex: 1;
`;
// const TabContentArea = posed(TabContentStyle)({
//   enter: {
//     x: 0,
//   },
//   exit: {
//     x: 50,
//   },
// });

interface TabContentProps {
  tab: string;
}

const TabContent: React.FunctionComponent<TabContentProps> = ({
  children,
  tab,
}) => {
  const { currentTab } = useTabContext();
  return (
    currentTab === tab && <TabContentArea key={tab}>{children}</TabContentArea>
  );
};

export default TabContent;
