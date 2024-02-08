import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import { GAME_LOGIC_REDUCER_NAME, gameLogicReducer } from './game/game-logic/reducer';

import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        [GAME_LOGIC_REDUCER_NAME]: gameLogicReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware)
});

epicMiddleware.run(rootEpic);
