import React, { useEffect, useRef } from 'react';
import { useTabContext } from './Tabs';
import styled from 'styled-components';
import FlatButton from 'components/FlatButton';
import { lightBorder, panelBackground, primaryAction } from 'style';
import { animated, useSpring } from 'react-spring';

const TabBarContainer = styled.div`
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  border-bottom: ${lightBorder};
  align-items: center;
  position: relative;
`;

const TabUnderline = animated(styled.div`
  border-bottom: 3px solid ${panelBackground};
  position: absolute;
  top: 0;
  bottom: 0;
  pointer-events: none;
`);

const TabBar: React.FunctionComponent = ({ children }) => {
  const { highlightedTabs, currentTab, setCurrentTab, tabs } = useTabContext();
  const containerRef = useRef(null);
  const [underlinePosition, setUnderlinePosition] = useSpring(() => ({
    left: 0,
    width: 0,
  }));
  useEffect(() => {
    const tabElement = containerRef.current.querySelector(
      `[data-tabid="${currentTab}"`
    );
    // It's entirely possibe, if unlikely, that tabElement could be null
    // There may be a use case for having tabs with no button
    const left = tabElement ? tabElement.offsetLeft : 0;
    const width = tabElement ? tabElement.offsetWidth : 0;
    setUnderlinePosition({ left, width });
  });

  return (
    <TabBarContainer ref={containerRef}>
      {tabs.map(tab => (
        <FlatButton
          primary={highlightedTabs.includes(tab.value)}
          key={tab.value}
          onClick={() => setCurrentTab(tab.value)}
          data-tabid={tab.value}
          leftIcon={tab.icon}
        >
          {tab.label}
        </FlatButton>
      ))}
      <TabUnderline style={underlinePosition} />
      <div
        css={`
          margin-left: auto;
          height: 100%;
        `}
      >
        {children}
      </div>
    </TabBarContainer>
  );
};

export default TabBar;
