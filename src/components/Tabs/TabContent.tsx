import React from 'react';

interface TabContentProps {
  currentTab?: string;
  tab: string;
  children: React.ReactElement;
}

const TabContent: React.FunctionComponent<TabContentProps> = ({
  children,
  currentTab,
  tab,
}) => {
  return currentTab === tab && children;
};

export default TabContent;
