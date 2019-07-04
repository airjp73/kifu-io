import React from 'react';
import { highlight, dark } from 'style';

const GoIcon: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = props => (
  <svg viewBox="0 0 100 100" xmlns="kifu.io" {...props}>
    <circle cx="25" cy="25" r="20" fill={dark} />
    <circle cx="25" cy="75" r="20" fill={highlight} />
    <circle cx="75" cy="25" r="20" fill={highlight} />
    <circle cx="75" cy="75" r="20" fill={dark} />
  </svg>
);

export default GoIcon;
