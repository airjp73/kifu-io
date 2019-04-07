import React, { useState, useContext } from 'react';
import styled from 'styled-components';

interface TabValue {
  value: string;
  icon?: string;
  label?: string;
  highlighted?: boolean;
}
interface TabContextValue {
  currentTab: string;
  highlightedTabs: string[];
  setCurrentTab: (tab: string) => void;
  tabs: TabValue[];
}
const TabContext = React.createContext<TabContextValue>(null);
export const useTabContext = () => useContext(TabContext);

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

interface TabsProps {
  defaultTab: string;
  tabs: TabValue[];
}
const Tabs: React.FunctionComponent<TabsProps> = ({
  children,
  defaultTab,
  tabs,
}) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const highlightedTabs = tabs
    .filter(tab => tab.highlighted)
    .map(tab => tab.value);

  return (
    <TabContext.Provider
      value={{
        currentTab,
        highlightedTabs,
        setCurrentTab,
        tabs,
      }}
    >
      <TabsContainer>{children}</TabsContainer>
    </TabContext.Provider>
  );
};

export default Tabs;
