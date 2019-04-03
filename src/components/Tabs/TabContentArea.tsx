import React, { useEffect, useMemo, useRef } from 'react';
import posed, { PoseGroup } from 'react-pose';
import { useTabContext } from './Tabs';
import usePrevious from 'hooks/usePrevious';

const transition = { duration: 250, ease: 'easeInOut' };
interface TabContentContainerProps {
  direction: 'left' | 'right';
}
const TabContentContainer = posed.div({
  preEnter: {
    x: ({ direction }: TabContentContainerProps) =>
      direction === 'left' ? '-100%' : '100%',
  },
  enter: {
    x: 0,
    transition,
  },
  exit: {
    x: ({ direction }: TabContentContainerProps) =>
      direction === 'left' ? '100%' : '-100%',
    transition,
  },
});

const TabContentArea: React.FunctionComponent = ({ children }) => {
  const { currentTab, tabs } = useTabContext();
  const previousTab = usePrevious(currentTab);

  const animDirection = useMemo(() => {
    const prevIndex = tabs.findIndex(tab => tab.value === previousTab);
    const currentIndex = tabs.findIndex(tab => tab.value === currentTab);
    return prevIndex < currentIndex ? 'right' : 'left';
  }, [currentTab]);

  return (
    <PoseGroup preEnterPose="preEnter" direction={animDirection}>
      <TabContentContainer
        css={`
          flex: 1;
        `}
        key={currentTab}
      >
        {/*
          Pass in props directly instead of tapping into the context
          So that the old container that's animating out doesn't update
        */}
        {React.Children.map(children, (child: React.ReactElement) =>
          React.cloneElement(child, { currentTab })
        )}
      </TabContentContainer>
    </PoseGroup>
  );
};

export default TabContentArea;
