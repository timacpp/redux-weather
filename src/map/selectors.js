import { createSelector } from '@reduxjs/toolkit'
import { MAP_LOGIC_REDUCER_NAME } from './reducer'

export const selectMapState = (state) => state[MAP_LOGIC_REDUCER_NAME];

export const userLocationSelector = createSelector(
    selectMapState,
    ({ userLocation }) => userLocation
);

export const citiesSelector = createSelector(
    selectMapState,
    ({ cities }) => cities
);