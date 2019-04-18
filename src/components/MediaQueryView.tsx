import React from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';

interface MediaQueryViewProps {
  children: React.ReactElement;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  negate?: boolean;
}

const MediaQueryView: React.FunctionComponent<MediaQueryViewProps> = ({
  children,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  negate = false,
}) => {
  const { height, width } = useWindowDimensions();
  const meetsHeightRequirements =
    (!minWidth || width >= minWidth) &&
    (!maxWidth || width <= maxWidth) &&
    (!minHeight || height >= minHeight) &&
    (!maxHeight || height <= maxHeight);
  const shouldRender = negate
    ? !meetsHeightRequirements
    : meetsHeightRequirements;
  return shouldRender && children;
};

export default MediaQueryView;
