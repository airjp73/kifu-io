import styled from 'styled-components';
import { boxShadowLow } from 'style';

const SimpleContent = styled.main`
  max-width: 1200px;
  margin: 1rem;
  text-align: center;
  background-color: white;
  border-radius: 3px;
  box-shadow: ${boxShadowLow};
  padding: 1rem;
`;

export default SimpleContent;
