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
  className?: string;
  defaultTab?: string;
}
const Tabs: React.FunctionComponent<TabsProps> = ({
  children,
  className,
  defaultTab,
}) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);

  return (
    <TabContext.Provider
      value={{
        currentTab,
        setCurrentTab,
      }}
    >
      <TabsContainer className={className}>{children}</TabsContainer>
    </TabContext.Provider>
  );
};

export default Tabs;
