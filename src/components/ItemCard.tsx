import React from 'react';
import 'styled-components/macro';
import { css } from 'styled-components';
import Button from 'components/Button';
import { highlightFaded, panelBackground, portraitMedia } from 'style';

interface ItemCardProps {
  linkTo: string;
  imageSource: string;
  title: string;
  subtitle?: string;
  buttonLabel?: string;
}

const ItemCard: React.FunctionComponent<ItemCardProps> = ({
  children,
  imageSource,
  linkTo,
  title,
  subtitle,
  buttonLabel = 'View on Amazon',
}) => (
  <div
    css={css`
      padding: 1rem;
      color: ${highlightFaded};
      max-width: 700px;
      margin: 0 auto;
      background-color: ${panelBackground};
      display: flex;

      ${portraitMedia} {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    `}
  >
    <div
      css={css`
        max-height: 15rem;
        width: 15rem;
        margin-right: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <img
        css={css`
          max-height: 15rem;
          max-width: 15rem;
        `}
        src={imageSource}
        alt={title}
      />
    </div>
    <div
      css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        width: 100%;

        > span {
          margin: 0.5rem 0;
        }

        h3 {
          margin: 0;

          + h4 {
            margin: 0.5rem 0;
          }
        }

        text-align: left;
      `}
    >
      <h3>{title}</h3>
      <h4>{subtitle}</h4>
      <p>{children}</p>
      <a
        css={css`
          width: max-content;
          align-self: flex-end;
          margin-top: auto;
          text-decoration: none;
        `}
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>{buttonLabel}</Button>
      </a>
    </div>
  </div>
);

export default ItemCard;
