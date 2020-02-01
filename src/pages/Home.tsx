import React from 'react';
import 'styled-components/macro';
import { css } from 'styled-components';
import { highlight } from 'style';
import Button from 'components/Button';
import { Link } from 'react-router-dom';

const Home = () => (
  <div
    css={css`
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    `}
  >
    <h1
      css={`
        margin-bottom: 0.5rem;
      `}
    >
      Kifu.io
    </h1>
    <p
      css={css`
        color: ${highlight};
      `}
    >
      Mobile friendly SGF hosting
    </p>
    <Link
      to="/upload"
      css={`
        margin-top: 1rem;
        text-decoration: none;
      `}
    >
      <Button>Upload a game</Button>
    </Link>
  </div>
);

export default Home;
