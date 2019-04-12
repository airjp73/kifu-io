import React from 'react';
import styled from 'styled-components';

interface FontIconStyleProps {
  size?: 'MEDIUM' | 'SMALL' | 'XSMALL';
}

interface FontIconProps {
  icon: string;
}

const sizeMap = {
  MEDIUM: '3rem',
  SMALL: '1.5rem',
  XSMALL: '1rem',
};

const FontIconStyle = styled.span<FontIconStyleProps>`
  font-size: ${props => sizeMap[props.size]};
`;

const FontIcon: React.FunctionComponent<
  FontIconProps & React.ComponentProps<typeof FontIconStyle>
> = ({ className, icon, ...rest }) => (
  <FontIconStyle className={`material-icons ${className}`} {...rest}>
    {icon}
  </FontIconStyle>
);

FontIcon.defaultProps = {
  size: 'MEDIUM',
};

export default FontIcon;
