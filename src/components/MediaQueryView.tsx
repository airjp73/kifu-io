import React from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';

interface MediaQueryViewProps {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

const MediaQueryView: React.FC<MediaQueryViewProps> = ({
  children,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
}) => {
  const { height, width } = useWindowDimensions();
  const meetsDimensionRequirements =
    (!minWidth || width >= minWidth) &&
    (!maxWidth || width <= maxWidth) &&
    (!minHeight || height >= minHeight) &&
    (!maxHeight || height <= maxHeight);
  return <>{meetsDimensionRequirements && children}</>;
};

export const LandscapeView: React.FC = ({ children }) => {
  const { height, width } = useWindowDimensions();
  return <>{width > height && children}</>;
};

export const PortraitView: React.FC = ({ children }) => {
  const { height, width } = useWindowDimensions();
  return <>{width <= height && children}</>;
};

export default MediaQueryView;
