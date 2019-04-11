import React, { useMemo } from 'react';
import { useTransition, animated } from 'react-spring';
import { useTabContext } from './Tabs';
import usePrevious from 'hooks/usePrevious';
import styled from 'styled-components';

const ParentTabContainer = styled.div`
  position: relative;
  height: 100%;
`;
const TabContentContainer = animated(styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: auto;
`);

const TabContentArea: React.FunctionComponent = ({ children }) => {
  const { currentTab } = useTabContext();
  const previousTab = usePrevious(currentTab);

  const animDirection = useMemo(() => {
    const tabs = React.Children.toArray(children);
    const findTabIndex = (tabName: string) =>
      tabs.findIndex(
        tab =>
          React.isValidElement<{ tab: string }>(tab) &&
          tab.props.tab === tabName
      );
    const prevIndex = findTabIndex(previousTab);
    const currentIndex = findTabIndex(currentTab);
    return prevIndex < currentIndex ? 'right' : 'left';
  }, [currentTab]);

  const transitions = useTransition(currentTab, null, {
    from: {
      transform:
        animDirection === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
      opacity: 0,
    },
    enter: {
      transform: 'translateX(0)',
      opacity: 1,
      flex: 1,
    },
    leave: {
      transform:
        animDirection === 'left' ? 'translateX(100%)' : 'translateX(-100%)',
      opacity: 0,
    },
  });

  return (
    <ParentTabContainer>
      {transitions.map(({ item, props, key }) => (
        <TabContentContainer key={key} style={props}>
          {/*
            Pass in props directly instead of tapping into the context
            So that the old container that's animating out doesn't update
          */}
          {React.Children.map(children, (child: React.ReactElement) =>
            React.cloneElement(child, { currentTab: item })
          )}
        </TabContentContainer>
      ))}
    </ParentTabContainer>
  );
};

export default TabContentArea;
