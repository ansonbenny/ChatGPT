import { createSlice } from "@reduxjs/toolkit";

let loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        site: true,
        api: true
    },
    reducers: ({
        setLoading: (state, { payload }) => {
            if (payload.site === false ||
                payload.site === true) {
                state.site = payload.site
            }

            if (payload.api === false ||
                payload.api === true) {
                state.api = payload.api
            }
            return state
        }
    })
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer