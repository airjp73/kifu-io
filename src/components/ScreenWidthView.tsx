import React from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';

interface ScreenWidthViewProps {
  children: React.ReactElement;
  size: 'LARGE' | 'SMALL';
}

const ScreenWidthView: React.FunctionComponent<ScreenWidthViewProps> = ({
  children,
  size,
}) => {
  const { width } = useWindowDimensions();
  switch (size) {
    case 'LARGE':
      return width > 700 && children;
    case 'SMALL':
      return width <= 700 && children;
    default:
      return null;
  }
};

export default ScreenWidthView;
