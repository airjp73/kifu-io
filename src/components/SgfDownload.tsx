import React, { useMemo } from 'react';
import 'styled-components/macro';
import { css } from 'styled-components';
import { useGoGameContext } from 'goban/GoGameContext';

interface SgfDownloadProps extends React.HTMLProps<HTMLAnchorElement> {
  sgfContents: string;
}

const SgfDownload: React.FC<SgfDownloadProps> = ({
  children,
  sgfContents,
  ...rest
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
  const formatPlayerName = (player?: string, team?: string, rank?: string) =>
    `${player || team || ''}${rank ? ` ${rank}` : ''}`;
  const fileName = `${formatPlayerName(
    playerBlack,
    teamBlack,
    rankBlack
  )} vs ${formatPlayerName(playerWhite, teamWhite, rankWhite)}.sgf`;

  return (
    <a
      css={css`
        text-decoration: none;
        color: inherit;
        font-weight: bold;
      `}
      href={downloadLink}
      download={fileName}
      {...rest}
    >
      {children}
    </a>
  );
};

export default SgfDownload;
