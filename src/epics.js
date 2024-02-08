import { combineEpics } from 'redux-observable';

import { gameEpics } from './game/game-logic/epics';

export const rootEpic = combineEpics(
    gameEpics, 
);
