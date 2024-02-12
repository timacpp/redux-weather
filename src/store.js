import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import { MAP_LOGIC_REDUCER_NAME, mapLogicReducer } from './map/reducer';

import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        [MAP_LOGIC_REDUCER_NAME]: mapLogicReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(epicMiddleware)
});

epicMiddleware.run(rootEpic);
