import styled, { keyframes } from 'styled-components';
import { dark, highlight } from 'style';

const grid = keyframes`
  0%, 100% { opacity: 0 }
  100% { opacity: 1}
`;

const SpinnerOuterWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const SpinnerContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 7rem;
  height: 10rem;
  opacity: 0.8;

  div {
    opacity: 0;
    position: absolute;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    animation: ${grid} 1s ease-in infinite alternate;
  }
  div:nth-child(1) {
    top: 4rem;
    left: 0;
    animation-delay: 0s;
  }
  div:nth-child(2) {
    top: 6rem;
    left: 2rem;
    animation-delay: 0.1s;
  }
  div:nth-child(3) {
    top: 6rem;
    left: 0;
    animation-delay: 0.2s;
  }
  div:nth-child(4) {
    top: 4rem;
    left: 2rem;
    animation-delay: 0.3s;
  }
  div:nth-child(5) {
    top: 2rem;
    left: 0;
    animation-delay: 0.4s;
  }
  div:nth-child(6) {
    top: 0;
    left: 4rem;
    animation-delay: 0.5s;
  }
  h3 {
    color: ${dark};
    position: absolute;
    top: 8rem;
    left: 0;
    right: 0;
    white-space: nowrap;
  }
`;

const BlackStone = styled.div`
  background: ${dark};
`;

const WhiteStone = styled.div`
  background: ${highlight};
`;

const Spinner = () => (
  <SpinnerOuterWrapper>
    <SpinnerContainer>
      <BlackStone />
      <WhiteStone />
      <BlackStone />
      <WhiteStone />
      <BlackStone />
      <WhiteStone />
    </SpinnerContainer>
  </SpinnerOuterWrapper>
);

export default Spinner;
