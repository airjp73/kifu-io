import React from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';

interface MediaQueryViewProps {
  children: React.ReactElement;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

interface OrientationViewProps {
  children: React.ReactElement;
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
  return meetsDimensionRequirements && children;
};

export const LandscapeView: React.FunctionComponent<OrientationViewProps> = ({
  children,
}) => {
  const { height, width } = useWindowDimensions();
  return width > height && children;
};

export const PortraitView: React.FunctionComponent<OrientationViewProps> = ({
  children,
}) => {
  const { height, width } = useWindowDimensions();
  return width <= height && children;
};

export default MediaQueryView;
