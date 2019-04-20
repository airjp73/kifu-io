import React, { useEffect, useRef } from 'react';
import { useTabContext } from './Tabs';
import styled from 'styled-components';
import { lightBorder, panelBackground } from 'style';
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
  const { currentTab } = useTabContext();
  const containerRef = useRef(null);
  const [underlinePosition, setUnderlinePosition] = useSpring(() => ({
    left: 0,
    width: 0,
  }));

  const moveUnderline = () => {
    const tabElement = containerRef.current.querySelector(
      `[data-tabid="${currentTab}"]`
    );
    const left = tabElement ? tabElement.offsetLeft : 0;
    const width = tabElement ? tabElement.offsetWidth : 0;
    setUnderlinePosition({ left, width });
  };

  useEffect(() => {
    moveUnderline();

    const observer = new MutationObserver(moveUnderline);
    observer.observe(containerRef.current, { childList: true });
    return () => observer.disconnect();
  }, [currentTab]);

  return (
    <TabBarContainer ref={containerRef}>
      {children}
      <TabUnderline style={underlinePosition} />
    </TabBarContainer>
  );
};

export default TabBar;
