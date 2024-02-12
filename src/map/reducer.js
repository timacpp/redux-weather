import { createSlice, createAction } from '@reduxjs/toolkit';

export const MAP_LOGIC_REDUCER_NAME = 'mapLogic';

const initialState = {
    userLocation: [53, 9],
    cities: []
}

const mapLogicSlice = createSlice({
    name: MAP_LOGIC_REDUCER_NAME,
    initialState,
    reducers: {
        setUserLocation: (state, { payload }) => {
            state.userLocation = payload;
            state.cities = state.cities;
        },
        setCities: (state, { payload }) => {
            state.userLocation = state.userLocation;
            state.cities = payload || [];
        }
    },
});


export const mapLogicReducer = mapLogicSlice.reducer;
export const { setUserLocation, setCities } = mapLogicSlice.actions;
export const initializeUserLocation = createAction(`${MAP_LOGIC_REDUCER_NAME}/initializeUserLocation`);
export const getLargestCitiesInBounds = createAction(`${MAP_LOGIC_REDUCER_NAME}/getLargestCitiesInBounds`)