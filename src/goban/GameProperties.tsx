import React from 'react';
import { useGoGameContext } from 'goban/GoGameContext';
import styled from 'styled-components';
import 'styled-components/macro';
import { GameStateProperties, PlayedOnDates } from 'goban/gameStateReducer';
import { getMonthString, getDayString } from 'util/dateUtils';

interface SupportedProperty {
  name: keyof GameStateProperties;
  label: string;
  transform?: (value: GameStateProperties[keyof GameStateProperties]) => string;
}

// This gets a little weird with complicated date scenarios
// but those seem a little unlikely
const transformPlayedOnd = (playedOn: PlayedOnDates) =>
  Object.entries(playedOn)
    .map(
      ([year, months]) =>
        `${Object.entries(months)
          .map(
            ([month, days]) =>
              `${days
                .map(day => getDayString(day))
                .join(', ')} of ${getMonthString(month)}`
          )
          .join(', ')} ${year}`
    )
    .join(', ');

const transformTimeLimit = (timeLimit: number) => {
  let minutes = Math.floor(timeLimit / 60);
  const seconds = timeLimit % 60;
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  const segments = [];
  if (hours) segments.push(`${hours} hours`);
  if (minutes) segments.push(`${minutes} minutes`);
  if (seconds) segments.push(`${seconds} seconds`);
  return segments.join(', ');
};

const supportedProperties: SupportedProperty[] = [
  { name: 'playedOn', label: 'Played', transform: transformPlayedOnd },
  { name: 'annotatorName', label: 'Annotator' },
  { name: 'copyright', label: 'Copyright' },
  { name: 'eventName', label: 'Event' },
  { name: 'opening', label: 'Opening' },
  { name: 'timeLimit', label: 'Time Settings', transform: transformTimeLimit },
  { name: 'overtime', label: 'Overtime' },
  { name: 'placePlayed', label: 'Location' },
  { name: 'result', label: 'Result' },
  { name: 'round', label: 'Round' },
  { name: 'ruleSet', label: 'Rules' },
  { name: 'source', label: 'Source' },
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
        {supportedProperties.map(
          ({ name, label, transform }) =>
            !!gameState.properties[name] && (
              <SimpleProperty
                key={name}
                label={label}
                value={
                  transform
                    ? transform(gameState.properties[name])
                    : (gameState.properties[name] as string | number)
                }
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
