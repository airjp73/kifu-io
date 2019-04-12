import React from 'react';
import styled from 'styled-components';

interface FontIconStyleProps {
  size?: 'MEDIUM' | 'SMALL';
}

interface FontIconProps {
  icon: string;
}

const FontIconStyle = styled.span<FontIconStyleProps>`
  ${props => (props.size === 'MEDIUM' ? '3rem' : '1.5rem')}
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
