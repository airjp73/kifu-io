import styled from 'styled-components';
import { boxShadowLow } from 'style';

const SimpleContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  background-color: white;
  border-radius: 3px;
  box-shadow: ${boxShadowLow};
  padding: 1rem;
  height: min-content;
`;

export default SimpleContent;
