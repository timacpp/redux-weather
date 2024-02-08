import { ofType, combineEpics } from 'redux-observable';
import { map, startWith, filter, tap, switchMap} from 'rxjs/operators';
import { from } from 'rxjs';

import { makeMove, makeMoveRequest, setBoardSize, initializeUserLocation, setUserLocation } from './reducer';
import { selectGameState, currentPlayerSelector } from './selectors';
import { aiPlayersSelector } from '../ai/selectors';
import { resetHistory, updateHistory } from '../components/game-history/reducer';

const validateMakeMoveRequestEpic = (action$, state$) => 
    action$.pipe(
        ofType(makeMoveRequest.type),
        map(({ payload }) => ({
            currentPlayer: currentPlayerSelector(state$.value),
            aiPlayers: aiPlayersSelector(state$.value),
            payload
        })),
        filter(({ currentPlayer, aiPlayers}) => !aiPlayers.includes(currentPlayer)),
        map(({ payload }) => makeMove(payload))
    )

const updateHistoryOnMoveEpic = (action$, state$) =>
    action$.pipe(
        ofType(makeMove.type, resetHistory.type),
        startWith("I'm here just for init and my value will be ignored"),
        map(() => selectGameState(state$.value)),
        map((gameState) => updateHistory(gameState))
    );

const resetHistoryEpic = (action$) =>
    action$.pipe(
        ofType(setBoardSize.type),
        map(() => resetHistory())
    );

const initializeUserLocationEpic = (action$) =>
    action$.pipe(
        ofType(initializeUserLocation.type),
        switchMap((ignored) => 
            from(new Promise((resolve) => navigator.geolocation.getCurrentPosition(resolve))).pipe(
                map(position => setUserLocation([position.coords.latitude, position.coords.longitude]))
            )
        )
    );

export const gameEpics = combineEpics(
    validateMakeMoveRequestEpic,
    updateHistoryOnMoveEpic,
    resetHistoryEpic,
    initializeUserLocationEpic
);
