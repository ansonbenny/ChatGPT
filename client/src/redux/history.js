import { createSlice } from "@reduxjs/toolkit";

let INITIAL_STATE = []

let historySlice = createSlice({
    name: 'history',
    initialState: INITIAL_STATE,
    reducers: {
        addHistory: (state, action) => {

        }
    }
})

export const { addHistory } = historySlice.actions

export default historySlice.reducer