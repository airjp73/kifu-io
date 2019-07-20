import React, { useMemo, ComponentProps } from 'react';
import 'styled-components/macro';
import { css } from 'styled-components';
import { useGoGameContext } from 'goban/GoGameContext';
import SpeedDialOption from './SpeedDialOption';
import { Download } from 'react-feather';

interface SgfDownloadProps
  extends Partial<ComponentProps<typeof SpeedDialOption>> {
  sgfContents: string;
}

const SgfDownload: React.FC<SgfDownloadProps> = ({
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
  const formatPlayerName = (player: string, team: string, rank: string) =>
    `${player || team}${rank ? ` ${rank}` : ''}`;
  const fileName = `${formatPlayerName(
    playerBlack,
    teamBlack,
    rankBlack
  )} vs ${formatPlayerName(playerWhite, teamWhite, rankWhite)}.sgf`;

  return (
    <SpeedDialOption label="Download" {...rest}>
      <a
        css={css`
          text-decoration: none;
          color: inherit;
          font-weight: bold;
        `}
        href={downloadLink}
        download={fileName}
      >
        <Download height="1rem" width="1rem" />
      </a>
    </SpeedDialOption>
  );
};

export default SgfDownload;
