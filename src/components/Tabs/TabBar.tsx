import React from 'react';
import { useTabContext } from './Tabs';
import styled from 'styled-components';
import FontIcon from 'components/FontIcon';
import FlatButton from 'components/FlatButton';
import { lightBorder, primaryAction, highlight } from 'style';

const TabBarContainer = styled.div`
  display: flex;
  flex-grow: 0;
  border-bottom: ${lightBorder};
`;

// interface TabBarButtonProps {
//   highlighted: boolean;
// }
// Use `any` because typing styled-components is frustrating
const TabBarButton = styled<any>(FlatButton)`
  padding: 0.5rem;
  transition: background-color 0.25s ease, color 0.25s ease;

  ${FontIcon} {
    font-size: 1rem;

    ~ * {
      padding-left: 0.5rem;
    }
  }

  ${({ highlighted }) =>
    highlighted &&
    `
      background-color: ${primaryAction};
      color: ${highlight};
    `}
`;

const TabBar: React.FunctionComponent = ({ children }) => {
  const { highlightedTabs, setCurrentTab, tabs } = useTabContext();
  return (
    <TabBarContainer>
      {tabs.map(tab => (
        <TabBarButton
          highlighted={highlightedTabs.includes(tab.value)}
          key={tab.value}
          onClick={() => setCurrentTab(tab.value)}
        >
          {tab.icon && <FontIcon icon={tab.icon} />}
          {tab.label && <span>{tab.label}</span>}
        </TabBarButton>
      ))}
    </TabBarContainer>
  );
};

export default TabBar;
