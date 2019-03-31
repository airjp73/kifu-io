import React from 'react';
import { useTabContext } from './Tabs';
import styled from 'styled-components';
import FontIcon from 'components/FontIcon';
import FlatButton from 'components/FlatButton';
import { lightBorder } from 'style';

const TabBarContainer = styled.div`
  display: flex;
  flex-grow: 0;
  border-bottom: ${lightBorder};

  ${FlatButton} {
    padding: 0.5rem;

    ${FontIcon} {
      font-size: 1rem;

      ~ * {
        padding-left: 0.5rem;
      }
    }
  }
`;

interface TabValue {
  value: string;
  icon?: string;
  label?: string;
}
interface TabBarProps {
  tabs: TabValue[];
}

const TabBar: React.FunctionComponent<TabBarProps> = ({ children, tabs }) => {
  const { currentTab, setCurrentTab } = useTabContext();
  return (
    <TabBarContainer>
      {tabs.map(tab => (
        <FlatButton onClick={() => setCurrentTab(tab.value)}>
          {tab.icon && <FontIcon icon={tab.icon} />}
          {tab.label && <span>{tab.label}</span>}
        </FlatButton>
      ))}
    </TabBarContainer>
  );
};

export default TabBar;
