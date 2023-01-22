import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'lesson',
    initialState:{
        lesson: {}
    },
    reducers:{
        setLesson: (state, action)=>{
            state.lesson = action.payload
        }, 
        addLessonText:(state, action)=>{
            state.lesson.text = action.payload
        }
    }
})

const {setLesson, addLessonText} = slice.actions

export {setLesson, addLessonText}

export default slice.reducer