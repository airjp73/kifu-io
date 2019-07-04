import React from 'react';
import 'styled-components/macro';
import ItemCard from 'components/ItemCard';
import { css } from 'styled-components';
import { highlightFaded } from 'style';
import reversable9x9 from 'images/reversable-9_9-13_13.jpg';

const GoProducts = () => (
  <div
    css={css`
      width: 100%;
      padding: 0 1rem 2rem 1rem;
      box-sizing: border-box;
      color: ${highlightFaded};
      text-align: center;

      section {
        margin-bottom: 3rem;

        > * + * {
          margin-top: 1rem;
        }
      }
    `}
  >
    <section>
      <h1>Start Playing</h1>
      <p>
        For anyone looking to start playing offline or online -- here are some
        resources to help you get started!
      </p>
    </section>

    <section>
      <h2>Starter Go Boards</h2>
      <ItemCard
        linkTo="https://amzn.to/2RShxL7"
        title="9x9 / 13x13 Goban"
        subtitle="Yellow Mountain Imports"
        imageSource={reversable9x9}
      >
        This board is reversable, having a 9x9 board on one side and a 13x13
        board on the other side. This makes it great for beginners because you
        can start on 9x9 and move up to 13x13 when your ready without spending
        more money.
      </ItemCard>
    </section>
  </div>
);

export default GoProducts;
