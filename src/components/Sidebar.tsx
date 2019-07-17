import styled from 'styled-components';
import { highlight, panelBackground, mediumLandscapeMedia } from 'style';

const Sidebar = styled.header`
  background-color: ${panelBackground};
  height: 100%;
  width: 175px;
  color: ${highlight};
  transition: 0.25s width ease;

  ${mediumLandscapeMedia} {
    width: 3rem;
  }
`;

export default Sidebar;
