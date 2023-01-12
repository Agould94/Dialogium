import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./features/User/userSlice"
import courseReducer from './features/Courses/courseSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        course: courseReducer
    } 
})

export default store 