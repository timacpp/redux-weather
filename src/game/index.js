import { 
    GameWrapper, GameInfoWrapper,
    Map, GameHistory, Status
 } from './components';

export const Game = () => (
    <GameWrapper>
        <Map />

        <GameInfoWrapper>
            <Status />

            <GameHistory />
        </GameInfoWrapper>
    </GameWrapper>
);