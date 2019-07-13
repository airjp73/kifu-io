import { useGoGameContext } from 'goban/GoGameContext';

const usePlayerNames = () => {
  const { gameState } = useGoGameContext();
  const {
    playerBlack,
    playerWhite,
    teamBlack,
    teamWhite,
    rankBlack,
    rankWhite,
  } = gameState.properties;

  const blackRank = rankBlack ? `${rankBlack} ` : '';

  return `${playerBlack || teamBlack} ${blackRank} vs ${playerWhite ||
    teamWhite} ${rankWhite || ''}`;
};

export default usePlayerNames;
