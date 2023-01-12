import {createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'user',
    initialState:{
        user: {}, 
    }, 
    reducers:{
        login: (state, action)=>{
            state.user = action.payload
        },
        logout: (state)=>{
            state.user = {}
        }
    }
})

const {login, logout} = slice.actions

export {login, logout}

export default slice.reducer