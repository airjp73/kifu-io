import React from 'react';
import styled from 'styled-components';
import BlackCaptures from './BlackCaptures';
import WhiteCaptures from './WhiteCaptures';

interface CaptureCountsProps {
  className?: string;
}

const CaptureCountContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 0.5rem;
  align-items: center;
  max-width: 100vw;
  overflow: hidden;
`;

const CaptureCounts: React.FunctionComponent<CaptureCountsProps> = ({
  className,
}) => (
  <CaptureCountContainer className={className}>
    <BlackCaptures />
    <WhiteCaptures />
  </CaptureCountContainer>
);
export default CaptureCounts;
