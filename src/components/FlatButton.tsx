import styled from 'styled-components';
import { panelHighlight, panelActiveButton } from 'style';

const FlatButton = styled.button`
  border: none;
  outline: none;
  padding: 0 0.5rem;
  background: none;
  color: inherit;
  display: flex;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: ${panelHighlight};
  }

  :active {
    background-color: ${panelActiveButton};
  }
`;

export default FlatButton;
