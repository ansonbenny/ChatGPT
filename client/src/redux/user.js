import { createSlice } from '@reduxjs/toolkit'

let INITIAL_STATE = null

let userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        insertUser: (state, action) => {
            return action.payload
        },
        emptyUser: (state, action) => {
            return null
        }
    }
})

export const { insertUser, emptyUser } = userSlice.actions

export default userSlice.reducer