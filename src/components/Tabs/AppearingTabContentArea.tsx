import React from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import { boxShadowLow } from 'style';
import { useTabContext } from './Tabs';

interface AppearingTabContentAreaProps {
  className?: string;
}

const TabContentContainer = animated(styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  box-shadow: ${boxShadowLow};
  border-radius: 5px;
  background-color: white;
`);

const AppearingTabContentArea: React.FC<AppearingTabContentAreaProps> = ({
  children,
  className,
}) => {
  const { currentTab } = useTabContext();

  const transitions = useTransition(currentTab, null, {
    from: {
      clipPath: 'circle(0%)',
    },
    enter: {
      clipPath: 'circle(100%)',
    },
    leave: {
      clipPath: 'circle(0%)',
    },
    config: {
      friction: 20,
      clamp: true,
    },
  });

  return (
    <>
      {transitions.map(
        ({ item, props, key }) =>
          item && (
            <TabContentContainer key={key} style={props} className={className}>
              {React.Children.map(children, (child: React.ReactElement) =>
                React.cloneElement(child, { currentTab: item })
              )}
            </TabContentContainer>
          )
      )}
    </>
  );
};

export default AppearingTabContentArea;
