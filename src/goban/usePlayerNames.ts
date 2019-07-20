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
  const blackPlayer = playerBlack || teamBlack || 'Black';
  const whitePlayer = playerWhite || teamWhite || 'White';

  return `${blackPlayer} ${blackRank} vs ${whitePlayer} ${rankWhite || ''}`;
};

export default usePlayerNames;
