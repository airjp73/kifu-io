import styled from 'styled-components';
import { panelBackground } from 'style';

const Sidebar = styled.header`
  background-color: ${panelBackground};
  height: 100%;
  width: 175px;
  display: flex;
  flex-direction: column;
`;

export const SidebarBottomArea = styled.div`
  margin-top: auto;
  padding: 1rem;
`;

export default Sidebar;
