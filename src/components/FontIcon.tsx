import React from 'react';

interface FontIconProps {
  className?: string;
  icon: string;
}

const FontIcon: React.FunctionComponent<FontIconProps> = ({
  className,
  icon,
}) => <span className={`material-icons ${className}`}>{icon}</span>;

export default FontIcon;