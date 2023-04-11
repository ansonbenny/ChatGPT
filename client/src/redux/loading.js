import { createSlice } from "@reduxjs/toolkit";

let loadingSlice = createSlice({
    name: 'loading',
    initialState: true,
    reducers: ({
        setLoading: (state, action) => {
            return action.payload
        }
    })
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer