import { createSlice } from "@reduxjs/toolkit";

let INITIAL_STATE = true

let loadingSlice = createSlice({
    name: 'loading',
    initialState: INITIAL_STATE,
    reducers: ({
        setLoading: (state, action) => {
            return action.payload
        }
    })
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer