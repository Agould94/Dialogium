import {createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'user',
    initialState:{
        user: null, 
    }, 
    reducers:{
        login: (state, action)=>{
            state.user = action.payload
        },
        logout: (state)=>{
            state.user = null
        }, 
        addCourse: (state, action)=>{
            state.user.courses.push(action.payload)
        }
    }
})

const {login, logout, addCourse} = slice.actions

export {login, logout, addCourse}

export default slice.reducer