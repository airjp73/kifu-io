import React from 'react';
import styled from 'styled-components';
import patreonButtonImage from 'images/patreon_button.png';

const PatreonImg = styled.img`
  max-width: 100%;
`;

const PatreonButton = () => (
  <a href="https://www.patreon.com">
    <PatreonImg src={patreonButtonImage} />
  </a>
);

export default PatreonButton;
