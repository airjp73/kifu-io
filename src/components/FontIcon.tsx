import React from 'react';
import styled from 'styled-components';

interface FontIconProps {
  className?: string;
  icon: string;
  size?: 'MEDIUM' | 'SMALL';
}

const FontIcon: React.FunctionComponent<FontIconProps> = ({
  className,
  icon,
}) => <span className={`material-icons ${className}`}>{icon}</span>;

const StyledFontIcon = styled(FontIcon)`
  font-size: ${props => (props.size === 'MEDIUM' ? '3rem' : '1.5rem')};
`;

StyledFontIcon.defaultProps = {
  size: 'MEDIUM',
};

export default StyledFontIcon;
