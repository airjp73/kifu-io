import React from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';

interface MediaQueryViewProps {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

const MediaQueryView: React.FunctionComponent<MediaQueryViewProps> = ({
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
  return meetsDimensionRequirements && <>{children}</>;
};

export const LandscapeView: React.FunctionComponent = ({ children }) => {
  const { height, width } = useWindowDimensions();
  return width > height && (children as React.ReactElement);
};

export const PortraitView: React.FunctionComponent = ({ children }) => {
  const { height, width } = useWindowDimensions();
  return width <= height && (children as React.ReactElement);
};

export default MediaQueryView;
