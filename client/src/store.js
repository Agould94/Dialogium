import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./features/User/userSlice"
import courseReducer from './features/Courses/courseSlice'
import lessonReducer from './features/Lessons/lessonSlice'
import videoReducer from './features/Videos/videoSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        courses: courseReducer, 
        lesson: lessonReducer,
        videos: videoReducer,
    } 
})

export default store 