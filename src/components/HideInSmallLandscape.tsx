import React from 'react';
import MediaQueryView, { PortraitView, LandscapeView } from './MediaQueryView';

const HideInSmallLandscape: React.FC = ({ children }) => (
  <>
    <PortraitView>{children}</PortraitView>
    <LandscapeView>
      <MediaQueryView minWidth={1000}>{children}</MediaQueryView>
    </LandscapeView>
  </>
);

export default HideInSmallLandscape;
