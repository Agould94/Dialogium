import { createSlice } from "@reduxjs/toolkit";
import userSlice from "../User/userSlice";

const slice = createSlice({
    name: 'courses',
    initialState:{
        course: {}, 
        courses: {},
        filteredCourses: null,
        categories: null,
        coursesByCategory: null
    },
    reducers:{
        setCourse: (state, action)=>{
            state.course = action.payload
        },
        setCourses: (state, action)=>{
            state.courses = action.payload
        },
        filterCourses: (state, action)=>{
                state.filteredCourses = state.courses.filter((course)=> course.title.toLowerCase().includes(action.payload.toLowerCase()))
        },
        updateCourseLesson: (state, action)=>{
            state.course.sections[action.payload.sectionNum].lessons.push(action.payload.lesson)
        }, 
        addUserToCourse:(state, action)=>{
            state.course.users.push(action.payload)
        },
        setCategories:(state, action)=>{
            state.categories = action.payload
        },
        filterCoursesByCategory:(state, action)=>{
            action.payload === "ALL" ?
            state.coursesByCategory = null
            :
            state.coursesByCategory = state.courses.filter((course)=> course.category === action.payload)
            
        }
    }
})

const {setCourse, setCourses, updateCourseLesson, addUserToCourse, filterCourses, setCategories, filterCoursesByCategory} = slice.actions

export {setCourse, setCourses, updateCourseLesson, addUserToCourse, filterCourses, setCategories, filterCoursesByCategory}

export default slice.reducer