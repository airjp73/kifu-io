import React from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import { boxShadowLow } from 'style';
import { useTabContext } from './Tabs';

interface AppearingTabContentAreaProps {
  className?: string;
  originX: number;
  originY: number;
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
  originX,
  originY,
}) => {
  const { currentTab } = useTabContext();

  const transitions = useTransition(currentTab, null, {
    from: {
      clipPath: `circle(0% at ${originX}% ${originY}%)`,
    },
    enter: {
      clipPath: `circle(150% at ${originX}% ${originY}%)`,
    },
    leave: {
      clipPath: `circle(0% at ${originX}% ${originY}%)`,
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
              {React.Children.map(children, child =>
                React.cloneElement(child as React.ReactElement<any>, {
                  currentTab: item,
                })
              )}
            </TabContentContainer>
          )
      )}
    </>
  );
};

export default AppearingTabContentArea;
