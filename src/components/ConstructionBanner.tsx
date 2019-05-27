import React from 'react';
import styled, { keyframes } from 'styled-components';

const ConsAnim = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(-100%); }
  50.001% { transform: translateX(100%); }
  100% { transform: translateX(0); }
`;

const Construction = styled.p`
  text-align: center;
  background-color: rgba(255, 0, 255, 0.5);
  margin: 0;
  padding: 0.5rem;
  margin: 0.5rem 0;
  overflow: hidden;

  span {
    white-space: nowrap;
    display: block;
    animation: ${ConsAnim} 5s linear infinite;
    width: max-content;
  }
`;

const ConstructionBanner = () => (
  <Construction>
    <span>🚧 Under Construction 🚧</span>
  </Construction>
);

export default ConstructionBanner;
