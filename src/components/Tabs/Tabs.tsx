import React, { useState, useContext } from 'react';
import styled from 'styled-components';

interface TabValue {
  value: string;
  icon?: string;
  label?: string;
}
interface TabContextValue {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  tabs: TabValue[];
}
const TabContext = React.createContext<TabContextValue>(null);
export const useTabContext = () => useContext(TabContext);

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  return (
    <TabContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        tabs,
      }}
    >
      <TabsContainer>{children}</TabsContainer>
    </TabContext.Provider>
  );
};

export default Tabs;
