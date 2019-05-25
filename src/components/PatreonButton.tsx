import React from 'react';
import styled from 'styled-components';

const PatreonImg = styled.img`
  max-width: 100%;
`;

const PatreonButton = () => (
  <a href="https://www.patreon.com">
    <PatreonImg src="patreon_button.png" />
  </a>
);

export default PatreonButton;
