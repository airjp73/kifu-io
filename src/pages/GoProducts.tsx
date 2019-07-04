import React from 'react';
import 'styled-components/macro';
import ItemCard from 'components/ItemCard';
import { css } from 'styled-components';
import { highlightFaded } from 'style';
import reversable9x9 from 'images/reversable-9_9-13_13.jpg';
import magnetic from 'images/magnetic.jpg';
import fullSize from 'images/19_19.jpg';
import ogsLogo from 'images/ogs-logo.png';
import kgsLogo from 'images/kgsLogo.png';

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
      <h2>Go Sets</h2>
      <ItemCard
        linkTo="https://amzn.to/2RShxL7"
        title="9x9 / 13x13 Goban with stones"
        subtitle="Yellow Mountain Imports"
        imageSource={reversable9x9}
      >
        This board is reversable, having a 9x9 board on one side and a 13x13
        board on the other side. This makes it great for beginners because you
        can start on 9x9 and move up to 13x13 when you're ready without spending
        more money.
      </ItemCard>

      <ItemCard
        linkTo="https://amzn.to/2LA0CMc"
        title="19x19 Goban with stones"
        subtitle="Yellow Mountain Imports"
        imageSource={fullSize}
      >
        This magnetic board is great for traveling but also a good alternative
        if you're looking for something on the cheaper side.
      </ItemCard>

      <ItemCard
        linkTo="https://amzn.to/2LCqV4C"
        title="Magnetic Goban and stones"
        subtitle="Yellow Mountain Imports"
        imageSource={magnetic}
      >
        This magnetic board is great for traveling but also a good alternative
        if you're looking for something on the cheaper side.
      </ItemCard>
    </section>

    <section>
      <h2>Places to Play Online</h2>

      <ItemCard
        linkTo="https://online-go.com"
        title="Online Go Server"
        imageSource={ogsLogo}
        buttonLabel="Play on OGS"
      />

      <ItemCard
        linkTo="https://www.gokgs.com/"
        title="KGS Go Server"
        imageSource={kgsLogo}
        buttonLabel="Play on KGS"
      />
    </section>
  </div>
);

export default GoProducts;
