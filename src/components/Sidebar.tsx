import styled from 'styled-components';
import { highlight, panelBackground } from 'style';

const Sidebar = styled.header`
  background-color: ${panelBackground};
  height: 100%;
  width: 175px;
  color: ${highlight};
`;

export default Sidebar;
