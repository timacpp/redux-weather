import { createSlice, createAction } from '@reduxjs/toolkit';
import { STARTING_PLAYER, DEFAULT_BOARD_SIZE } from './const';
import { generateBoard } from './logic';

export const GAME_LOGIC_REDUCER_NAME = 'gameLogic';

const initialState = {
    board: generateBoard(DEFAULT_BOARD_SIZE),
    currentPlayer: STARTING_PLAYER,
    boardSize: DEFAULT_BOARD_SIZE,
    userLocation: [53, 9]
}

const gameLogicSlice = createSlice({
    name: GAME_LOGIC_REDUCER_NAME,
    initialState,
    reducers: {
        setUserLocation: (state, { payload }) => {
            state.userLocation = payload;
            state.cities = state.cities;
        },
        setCities: (state, { payload }) => {
            state.userLocation = state.userLocation;
            state.cities = payload;
        }
    },
});

export const makeMoveRequest = createAction(`${GAME_LOGIC_REDUCER_NAME}/makeMoveRequest`)

export const { setUserLocation, setCities } = gameLogicSlice.actions;

export const gameLogicReducer = gameLogicSlice.reducer;

export const initializeUserLocation = createAction(`${GAME_LOGIC_REDUCER_NAME}/initializeUserLocation`);

export const getCitiesInRadius = createAction(`${GAME_LOGIC_REDUCER_NAME}/getCitiesInRadius`)