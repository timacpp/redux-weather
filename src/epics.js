import { combineEpics } from 'redux-observable';

import { gameEpics } from './game/game-logic/epics';
import { aiEpics } from './game/ai/epics';

export const rootEpic = combineEpics(
    gameEpics, 
    aiEpics
);
