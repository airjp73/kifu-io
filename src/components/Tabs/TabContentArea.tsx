import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { useTabContext } from './Tabs';

const TabContentContainer = posed.div({
  enter: {
    x: 0,
    delay: 300,
    beforeChildren: true,
  },
  exit: {
    x: '100%',
  },
});

const TabContentArea: React.FunctionComponent = ({ children }) => {
  const { currentTab } = useTabContext();
  return (
    <PoseGroup>
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
