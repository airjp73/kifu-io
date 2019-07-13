import styled from 'styled-components';
import { highlight, panelBackground, smallLandscapeMedia } from 'style';

const Sidebar = styled.header`
  background-color: ${panelBackground};
  height: 100%;
  width: 175px;
  color: ${highlight};
  transition: 0.25s width ease;

  ${smallLandscapeMedia} {
    width: 3rem;
  }
`;

export default Sidebar;
