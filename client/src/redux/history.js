import { createSlice } from "@reduxjs/toolkit";

let historySlice = createSlice({
    name: 'history',
    initialState: [],
    reducers: {
        addHistory: (state, { payload }) => {
            return payload
        },
        activePage: (state, { payload = null }) => {
            let pos = null
            state.forEach((obj, index) => {
                if (obj.chatId === payload) {
                    obj.active = true
                    pos = index
                } else {
                    obj.active = false
                }
            })

            if (pos) {
                let obj = state[pos]
                state.splice(pos,1)
                state.unshift(obj)
            }

            return state
        }
    }
})

export const { addHistory, activePage } = historySlice.actions

export default historySlice.reducer