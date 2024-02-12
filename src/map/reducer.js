import { createSlice, createAction } from '@reduxjs/toolkit';

export const MAP_LOGIC_REDUCER_NAME = 'mapLogic';

const initialState = {
    userLocation: [53, 9],
    cities: [],
    version: 0,
    darkMode: false,
}

const mapLogicSlice = createSlice({
    name: MAP_LOGIC_REDUCER_NAME,
    initialState,
    reducers: {
        setUserLocation: (state, { payload }) => {
            state.userLocation = payload;
            state.cities = state.cities;
            state.version = state.version + 1;
            state.darkMode = state.darkMode;
        },
        setCities: (state, { payload }) => {
            state.userLocation = state.userLocation;
            state.cities = payload;
            state.version = state.version;
            state.darkMode = state.darkMode;
        },
        incrementVersion: (state, { payload }) => {
            state.userLocation = state.userLocation;
            state.cities = state.cities;
            state.version = state.version + 1;
            state.darkMode = state.darkMode;
        },
        invertMode: (state, { payload }) => {
            state.userLocation = state.userLocation;
            state.cities = state.cities;
            state.version = state.version;
            state.darkMode ^= true;
        },
    },
});


export const mapLogicReducer = mapLogicSlice.reducer;
export const { setUserLocation, setCities, incrementVersion, invertMode } = mapLogicSlice.actions;
export const initializeUserLocation = createAction(`${MAP_LOGIC_REDUCER_NAME}/initializeUserLocation`);
export const getLargestCitiesInBounds = createAction(`${MAP_LOGIC_REDUCER_NAME}/getLargestCitiesInBounds`)