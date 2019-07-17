import React from 'react';
import { useTabContext } from './Tabs';
import styled from 'styled-components';

const ParentTabContainer = styled.div`
  position: relative;
  height: 100%;
  overflow: auto;
`;

const AppearingTabContentArea: React.FunctionComponent = ({ children }) => {
  const { currentTab } = useTabContext();

  return (
    <ParentTabContainer>
      {React.Children.map(children, (child: React.ReactElement) =>
        React.cloneElement(child, { currentTab })
      )}
    </ParentTabContainer>
  );
};

export default AppearingTabContentArea;
