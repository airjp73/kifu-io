import styled from 'styled-components';
import { panelHighlight, boxShadowLow } from 'style';

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
    background-color: ${panelHighlight};
  }

  :active {
    box-shadow: ${boxShadowLow} ${panelHighlight} inset;
    transform: translateY(1px);
  }
`;

export default FlatButton;