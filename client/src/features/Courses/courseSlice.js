import { createSlice } from "@reduxjs/toolkit";
import userSlice from "../User/userSlice";

const slice = createSlice({
    name: 'courses',
    initialState:{
        course: {}, 
        courses: {},
        filteredCourses:{}
    },
    reducers:{
        setCourse: (state, action)=>{
            state.course = action.payload
        },
        setCourses: (state, action)=>{
            state.courses = action.payload
        },
        filterCourses: (state, action)=>{
            state.filteredCourses = state.courses.filter((course)=> course.title.includes(action.payload))
        },
        updateCourseLesson: (state, action)=>{
            console.log(action.payload.sectionNum)
            console.log(action.payload.lesson)
            state.course.sections[action.payload.sectionNum].lessons.push(action.payload.lesson)
        }, 
        addUserToCourse:(state, action)=>{
            state.course.users.push(action.payload)
        }
    }
})

const {setCourse, setCourses, updateCourseLesson, addUserToCourse, filterCourses} = slice.actions

export {setCourse, setCourses, updateCourseLesson, addUserToCourse, filterCourses}

export default slice.reducer