import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'videos',
    initialState:{
        video: {}, 
        videos: {},
        videoIds: [],
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
        addVideoIds: (state, action)=>{
            state.videoIds.push(action.payload)
        }, 
        resetVideoIds: (state)=>{
            state.videoIds = []
        }
    }
})

const {setVideo, setVideos, addVideoIds, resetVideoIds, resetVideos} = slice.actions

export {setVideo, setVideos, addVideoIds, resetVideoIds, resetVideos}

export default slice.reducer