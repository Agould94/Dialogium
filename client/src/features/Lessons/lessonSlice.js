import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'lesson',
    initialState:{
        lesson: {}
    },
    reducers:{
        setLesson: (state, action)=>{
            state.lesson = action.payload
        }
    }
})

const {setLesson} = slice.actions

export {setLesson}

export default slice.reducer