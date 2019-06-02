import React from 'react';
import styled from 'styled-components';

const sizeMap = {
  MEDIUM: '2.5rem',
  SMALL: '1.5rem',
  XSMALL: '1rem',
};

interface FontIconStyleProps {
  size?: keyof typeof sizeMap;
}

interface FontIconProps {
  icon: string;
}

const FontIconStyle = styled.span<FontIconStyleProps>`
  font-size: ${({ size = 'MEDIUM' }) => sizeMap[size]};
`;

const FontIcon: React.FunctionComponent<
  FontIconProps & React.ComponentProps<typeof FontIconStyle>
> = ({ className, icon, ...rest }) => (
  <FontIconStyle className={`material-icons ${className}`} {...rest}>
    {icon}
  </FontIconStyle>
);

export default FontIcon;
