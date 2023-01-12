import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'course',
    initialState:{
        course: {}
    },
    reducers:{
        setCourse: (state, action)=>{
            state.course = action.payload
        }
    }
})

const {setCourse} = slice.actions

export {setCourse}

export default slice.reducer