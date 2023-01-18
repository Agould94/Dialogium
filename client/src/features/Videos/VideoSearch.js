import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import { useParams } from 'react-router-dom'

import VideoSearchCard from './VideoSearchCard'

import { FormControl, InputLabel, Input, Box, Button, Card, CardMedia, CardContent, Typography, CardActions } from '@mui/material'

import { setVideos, addVideoIds, resetVideoIds } from './videoSlice'

import { setLesson } from '../Lessons/lessonSlice'

function VideoSearch() {
    const lesson = useSelector(state=>state.lesson.lesson)
    const [search, setSearch] = useState(lesson.name)
    const [isFetching, setIsFetching] = useState(false)
    const videos = useSelector(state=> state.videos.videos)
    const videoIds = useSelector(state=>state.videos.videoIds)
    const {courseId, sectionNum, lessonNum} = useParams()
    const dispatch = useDispatch()
    console.log(videos)
    let videosToDisplay 
    console.log(videoIds)

    if(Object.keys(videos).length >0){
     videosToDisplay = videos.map((video)=> {
      return(
      <Card sx = {{maxWidth: 320, mt: 3}}>
        <CardMedia sx = {{height: 180}} image = {video.snippet.thumbnails.medium.url} title = {`${video.snippet.title} thumbnail`}/>
        <CardContent>
          <Typography variant = "h5" component = "div">
            {video.snippet.title}
          </Typography>
          <Typography variant="body2" color = 'text.secondary'>
            {video.snippet.description}
          </Typography>
          <Button value = {video.id.videoId} size = "small" variant = "contained" color = "success" onClick = {handleAddToLesson}>
            Add To Lesson
          </Button>
        </CardContent>
      </Card>
      )
    })
    }

    async function handleAddToLesson(e){
      console.log(e.target.value)
      dispatch(addVideoIds(e.target.value))
    }

    useEffect(()=>{
      if(!isFetching && Object.keys(lesson).length > 0){
        //dispatch(addVideoIds(e.target.value))
        setIsFetching(true)
        addVideoToLesson()
      }
    }, [videoIds])


    function addVideoToLesson(){
      fetch(`/videos`, {
        method: "POST", 
        headers:{
          'Content-Type':"application/json"
        }, 
        body: JSON.stringify({
          lesson_id: lesson.id,
          video_ids: videoIds
        })
      }).then((r)=>r.json())
      .then((lesson)=>{
        dispatch(setLesson(lesson))
        setIsFetching(false)
        dispatch(resetVideoIds())
      })
      }

      function deleteVideoFromLesson(){}
    

    useEffect(()=>{
    setSearch(lesson.name)
  }, [lesson])
    
    console.log(lesson)
    console.log(search)

    function handleSearch(e){
        setSearch(e.target.value)
    }

    function handleSubmit(e){
      e.preventDefault()
      console.log("submit")

      fetch(`/search?search=${search}`)
      .then((r)=>r.json())
      .then((videos)=>{
        console.log(videos.items)
        dispatch(setVideos(videos.items))
      }
      
      )
    }

  return (
    <Box sx={{ display: 'inline-flex', justifyContent: 'center', marginTop: 3, marginRight: 10, flexDirection: 'column'}} >
        <form onSubmit = {handleSubmit}>
          <Box sx = {{display: 'flex', flexDirection: 'column'}}>
          <FormControl variant = 'standard'>
              <InputLabel htmlFor = "SearchTerm" shrink="true" >
                  Enter Search Term:
              </InputLabel>
              <Input variant = "outlined" name = "search" value = {search} onChange = {handleSearch}></Input>
          </FormControl>
          <Button type = "submit" variant = "outlined" size = "small">Search</Button>
          </Box>
        </form>
      <Box>
        {videosToDisplay ?
          videosToDisplay
          :
          null}
      </Box>
      
    </Box>
  )
}

export default VideoSearch