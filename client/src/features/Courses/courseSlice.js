import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'courses',
    initialState:{
        course: {}, 
        courses: {},
    },
    reducers:{
        setCourse: (state, action)=>{
            state.course = action.payload
        },
        setCourses: (state, action)=>{
            state.courses = action.payload
        },
        updateCourseLesson: (state, action)=>{
            console.log(action.payload.sectionNum)
            console.log(action.payload.lesson)
            state.course.sections[action.payload.sectionNum].lessons.push(action.payload.lesson)
        }
    }
})

const {setCourse, setCourses, updateCourseLesson} = slice.actions

export {setCourse, setCourses, updateCourseLesson}

export default slice.reducer