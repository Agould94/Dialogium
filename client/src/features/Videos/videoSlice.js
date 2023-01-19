import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'videos',
    initialState:{
        video: {}, 
        videos: {},
        videoIds: [],
        lessonVideos: []
    },
    reducers:{
        setVideo: (state, action)=>{
            state.video = action.payload
        },
        setVideos: (state, action)=>{
            state.videos = action.payload
        }, 
        resetVideos: (state)=>{
            state.videos = {}
        },
        setLessonVideos: (state, action)=>{
            state.lessonVideos = action.payload
        },
        filterLessonVideos: (state, action)=>{
            console.log(state.lessonVideos)
            state.lessonVideos = state.lessonVideos.filter((video)=>video.id !== action.payload)
        },
        addVideoIds: (state, action)=>{
            state.videoIds.push(action.payload)
        }, 
        resetVideoIds: (state)=>{
            state.videoIds = []
        }
    }
})

const {setVideo, setVideos, addVideoIds, resetVideoIds, resetVideos, filterLessonVideos, setLessonVideos } = slice.actions

export {setVideo, setVideos, addVideoIds, resetVideoIds, resetVideos, filterLessonVideos, setLessonVideos}

export default slice.reducer