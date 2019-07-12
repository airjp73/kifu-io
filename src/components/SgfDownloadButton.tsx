import React, { useMemo } from 'react';
import 'styled-components/macro';
import { css } from 'styled-components';
import FlatButton from 'components/FlatButton';
import { useGoGameContext } from 'goban/GoGameContext';

interface SgfDownloadButtonProps {
  sgfContents: string;
}

const SgfDownloadButton: React.FC<SgfDownloadButtonProps> = ({
  sgfContents,
}) => {
  const { gameState } = useGoGameContext();
  const {
    playerBlack,
    playerWhite,
    rankBlack,
    rankWhite,
    teamBlack,
    teamWhite,
  } = gameState.properties;

  const downloadLink = useMemo(
    () =>
      sgfContents &&
      URL.createObjectURL(
        new Blob([sgfContents], { type: 'application/x-go-sgf' })
      ),
    [sgfContents]
  );
  const formatPlayerName = (player: string, team: string, rank: string) =>
    `${player || team}${rank ? ` ${rank}` : ''}`;
  const fileName = `${formatPlayerName(
    playerBlack,
    teamBlack,
    rankBlack
  )} vs ${formatPlayerName(playerWhite, teamWhite, rankWhite)}.sgf`;

  return (
    <FlatButton>
      <a
        css={css`
          text-decoration: none;
          color: inherit;
          font-weight: bold;
        `}
        href={downloadLink}
        download={fileName}
      >
        Download
      </a>
    </FlatButton>
  );
};

export default SgfDownloadButton;
