import React from 'react';
import { useGoGameContext } from 'contexts/GoGameContext';
import styled from 'styled-components';
import { GameStateProperties } from 'contexts/gameStateReducer';

interface SupportedProperty {
  name: keyof GameStateProperties;
  label: string;
}
const supportedProperties: SupportedProperty[] = [
  { name: 'annotatorName', label: 'Annotator' },
  { name: 'copyright', label: 'Copyright' },
  { name: 'eventName', label: 'Event' },
  { name: 'opening', label: 'Opening' },
  { name: 'overtime', label: 'Overtime' },
  { name: 'placePlayed', label: 'Location' },
  { name: 'result', label: 'Result' },
  { name: 'round', label: 'Round' },
  { name: 'ruleSet', label: 'Rules' },
  { name: 'source', label: 'Source' },
  { name: 'timeLimit', label: 'Time Settings' },
  { name: 'userEnteringGameRecord', label: 'Recorded By' },
];

interface SimplePropertyProps {
  label: string;
  value?: string | number;
}
const SimpleProperty: React.FunctionComponent<SimplePropertyProps> = ({
  label,
  children,
  value,
}) => (
  <li
    css={`
      margin: 1rem 0;
    `}
  >
    <strong>{label}:</strong> {value || children}
  </li>
);

interface PlayerProps {
  color: string;
  player?: string;
  team?: string;
  rank?: string;
}
const Player: React.FunctionComponent<PlayerProps> = ({
  color,
  player,
  team,
  rank,
}) =>
  (!!player || !!rank || !!team) && (
    <SimpleProperty label={color}>
      {player || team} {rank}
    </SimpleProperty>
  );

const PropertiesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const GameProperties = () => {
  const { gameState } = useGoGameContext();
  const {
    application,
    gameName,
    gameComment,
    playerBlack,
    playerWhite,
    teamBlack,
    teamWhite,
    rankBlack,
    rankWhite,
  } = gameState.properties;
  return (
    <div
      css={`
        padding: 0 1rem;
      `}
    >
      {gameName && <h4>{gameName}</h4>}
      {gameComment && <p>{gameComment}</p>}
      <PropertiesList>
        <Player
          player={playerBlack}
          team={teamBlack}
          rank={rankBlack}
          color="Black"
        />
        <Player
          player={playerWhite}
          team={teamWhite}
          rank={rankWhite}
          color="White"
        />
        {playedOn && (
          <ul>
            {Object.keys(playedOn).map(([year, months]) => (
              <li>
                {year}
                {months && Object.keys(months)}
              </li>
            ))}
          </ul>
        )}
        {supportedProperties.map(
          ({ name, label }) =>
            !!gameState.properties[name] && (
              <SimpleProperty
                key={name}
                label={label}
                value={gameState.properties[name] as string | number}
              />
            )
        )}
        {application && (
          <SimpleProperty
            label="SGF Created With"
            value={`${application.name} ${application.version}`}
          />
        )}
      </PropertiesList>
    </div>
  );
};

export default GameProperties;
