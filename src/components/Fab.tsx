import styled, { keyframes, css } from 'styled-components';
import 'styled-components/macro';
import { panelBackground, highlight, boxShadowLow, boxShadowMed } from 'style';

interface FabProps {
  highlighted?: boolean;
  size?: 'MEDIUM' | 'SMALL';
}

const inactiveSvg = css`
  filter: drop-shadow(1px 1px 2px ${highlight});
  transform: scale(1);
`;
const activeSvg = css`
  filter: drop-shadow(2px 2px 5px ${highlight});
  transform: scale(1.15);
  stroke-width: 2.5;
`;
const breathe = keyframes`
  0% { ${inactiveSvg} } 
  50% { ${activeSvg} } 
  100% { ${inactiveSvg} } 
`;
const breathingSvg = css`
  :not(:hover) {
    svg {
      animation: ${breathe} 2s infinite;
    }
  }
`;

const sizeDimensions = {
  MEDIUM: '3rem',
  SMALL: '2rem',
};

const Fab = styled.button<FabProps>`
  border-radius: 50%;
  background-color: ${panelBackground};
  height: ${({ size }) => sizeDimensions[size]};
  width: ${({ size }) => sizeDimensions[size]};
  border: none;
  outline: none;
  color: ${highlight};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${boxShadowLow};
  transition: transform 0.25s ease;

  ${({ highlighted }) => highlighted && breathingSvg}

  :hover {
    box-shadow: ${boxShadowMed};
    transform: scale(1.05);

    svg {
      ${activeSvg}
    }
  }
`;

Fab.defaultProps = {
  size: 'MEDIUM',
};

export default Fab;
