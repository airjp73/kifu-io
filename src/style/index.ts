import mapValues from 'lodash/mapValues';
import purpleData from './colors/purple';
import tealData from './colors/teal';
import redData from './colors/red';

export const purple = mapValues(purpleData, val => val.hex);
export const teal = mapValues(tealData, val => val.hex);
export const red = mapValues(redData, val => val.hex);

export const panelBackground = purple[70];
export const highlight = teal[0];
export const highlightFaded = teal[10];
export const stoneSelectionHighlight = 'rgba(121,113,234, .5)'; // rgb of primaryAction
export const hotspotHighlight = 'rgba(255,100,100, .75)';
export const fadedGrey = '#6D6D6D';
export const error = '#E8291D';
export const dark = purple[100];
export const darkFaded = purple[60];

export const primaryAction = teal[50];

export const boxShadowLow = '1px 1px 3px rgba(0,0,0,.5)';
export const boxShadowMed = '2px 2px 4px rgba(0,0,0,.5)';
export const boxShadowDepressed = '1px 1px 2px rgba(0,0,0,.5)';

export const headerHeight = '4rem';

export const lightBorder = '1px solid rgba(0, 0, 0, .2)';

export const landscapeMedia = '@media only screen and (orientation: landscape)';
export const portraitMedia = '@media only screen and (orientation: portrait)';
export const smallLandscapeMedia = `@media only screen and (orientation: landscape) and (max-width: 1000px)`;
export const mediumLandscapeMedia = `@media only screen and (orientation: landscape) and (max-width: 1200px)`;
export const largeLandscapeMedia =
  '@media only screen and (orientation: landscape) and (min-width: 1000px)';
