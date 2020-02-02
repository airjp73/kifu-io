import React, { useState, useContext } from 'react';
import styled from 'styled-components';

interface TabContextValue {
  currentTab?: string;
  setCurrentTab: (tab: string | null) => void;
}
const TabContext = React.createContext<TabContextValue | null>(null);
export const useTabContext = (): TabContextValue => {
  const contextValue = useContext(TabContext);
  if (!contextValue)
    throw new Error('Attempted to access Tab context but was not found');
  return contextValue;
};

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
  const [currentTab, setCurrentTab] = useState<string | null>(defaultTab);

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
