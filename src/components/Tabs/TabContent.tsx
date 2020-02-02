import React from 'react';

interface TabContentProps {
  currentTab?: string;
  tab: string;
}

const TabContent: React.FC<TabContentProps> = ({
  children,
  currentTab,
  tab,
}) => {
  return <>{currentTab === tab && children}</>;
};

export default TabContent;
