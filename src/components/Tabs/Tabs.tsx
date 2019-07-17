import React, { useState, useContext } from 'react';
import styled from 'styled-components';

interface TabContextValue {
  currentTab?: string;
  setCurrentTab: (tab: string) => void;
}
const TabContext = React.createContext<TabContextValue>(null);
export const useTabContext = () => useContext(TabContext);

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

interface TabsProps {
  defaultTab?: string;
}
const Tabs: React.FunctionComponent<TabsProps> = ({ children, defaultTab }) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);

  return (
    <TabContext.Provider
      value={{
        currentTab,
        setCurrentTab,
      }}
    >
      <TabsContainer>{children}</TabsContainer>
    </TabContext.Provider>
  );
};

export default Tabs;
