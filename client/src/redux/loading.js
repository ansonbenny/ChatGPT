import { createSlice } from "@reduxjs/toolkit";

let loadingSlice = createSlice({
    name: 'loading',
    initialState: true,
    reducers: ({
        setLoading: (state, { payload }) => {
            state = payload
            return state
        }
    })
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer