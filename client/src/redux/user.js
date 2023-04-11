import { createSlice } from '@reduxjs/toolkit'

let userSlice = createSlice({
    name: 'user',
    initialState: null,
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