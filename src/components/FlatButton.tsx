import styled from 'styled-components';
import { panelHover } from 'style';

const FlatButton = styled.button`
  border: none;
  outline: none;
  padding: 0 .5rem;
  background: none;
  color: inherit;
  display: flex;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: ${panelHover};
  }
`;

export default FlatButton;