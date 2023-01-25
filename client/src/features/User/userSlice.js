import {createSlice} from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'user',
    initialState:{
        user: null,
        other: null,
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
        },
        updateInterests:(state, action)=>{
            state.user.interests.push(action.payload)
        },
        setUser: (state, action)=>{
            state.user = action.payload
        }, 
        setOther: (state, action)=>{
            state.other = action.payload
        }
    }
})

const {login, logout, addCourse, updateInterests, setUser, setOther} = slice.actions

export {login, logout, addCourse, updateInterests, setUser, setOther}

export default slice.reducer