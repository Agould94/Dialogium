import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'

import VideoSearch from '../Videos/VideoSearch'

import { setLesson } from './lessonSlice'
import { setCourse } from '../Courses/courseSlice'
import { updateCourseLesson } from '../Courses/courseSlice'

import { resetVideoIds, resetVideos } from '../Videos/videoSlice'


import { 
  Grid, 
  Typography, 
  FormControl, 
  InputLabel, 
  Input, 
  Box, 
  Button 
} from '@mui/material'

import { useParams } from 'react-router-dom'

function CreateLesson() {
  const dispatch = useDispatch()
  const params = useParams()
  const history = useHistory()
  
  const course = useSelector(state=>state.courses.course)
  console.log(course)

  const courseId = params.courseId
  const sectionNum = params.sectionNum

  const [name, setName] = useState("")
  const [subject, setSubject] = useState("")
  const [text, setText] = useState("")



  useEffect(()=>{
      if(Object.keys(course).length === 0){
      fetch(`/courses/${courseId}`)
      .then((r)=>r.json())
      .then((course)=>{
        dispatch(setCourse(course))
      })
    } 
  }, [])

  const videoIds = useSelector(state=>state.videos.videoIds)
  console.log(videoIds)
  function handleSetName(e){
    setName(e.target.value)
  }
  function handleSetSubject(e){
    setSubject(e.target.value)
  }
  function handleSetText(e){
    setText(e.target.value)
  }


  function handleSubmit(e){
    e.preventDefault()

    fetch("/lessons", {
      method: "POST", 
      headers:{
        'Content-Type':"application/json"
      },
      body: JSON.stringify({
        name: name, 
        subject: subject,
        text: text, 
        courseId: courseId,
        sectionNum: sectionNum,
        video_ids: videoIds
      })
    }).then((r)=>r.json())
    .then((lesson)=>{
      dispatch(setLesson(lesson))
      dispatch(updateCourseLesson({sectionNum: sectionNum, lesson: lesson}))
      dispatch(resetVideoIds())
      dispatch(resetVideos())
      history.push(`/courses/${courseId}/sections/${sectionNum}/lessons/${course.sections[sectionNum].lessons.length}`)
    }
    )

  }
  return (
    <div>
      {course.id ?
      <Grid container columnSpacing={{xs: 2}}>
        <Grid item xs = {6}>
          <Box sx = {{display: 'flex', flexDirection: 'column'}}>
            <Typography variant = "h5"> Add a Lesson to your {course.title.slice(6, course.title.length)} course:</Typography>
            <form onSubmit = {handleSubmit}>
              <Box sx = {{display: 'flex', flexDirection: 'column', width: '75%'}}>
              <FormControl variant = "standard">
                <InputLabel htmlFor="lessonName">Lesson Name</InputLabel>
                <Input id="lessonName" name = "name" value = {name} onChange = {handleSetName}></Input>
              </FormControl>

              <FormControl variant = "standard">
                <InputLabel htmlFor="lessonSubject">Lesson Subject</InputLabel>
                <Input id="lessonSubject" name = "subject" value = {subject} onChange = {handleSetSubject}></Input>
              </FormControl>

              <FormControl variant = "standard">
                <InputLabel htmlFor="lessonText">Lesson Text</InputLabel>
                <Input id="lessonText" name = "text" value = {text} onChange = {handleSetText}></Input>
              </FormControl>
              <Button type = "submit" variant = "outlined">Submit</Button>
              </Box>
            </form>
          </Box>
        </Grid>
        <Grid item xs = {6} sx = {{justifyContent: 'center', overflow: 'auto'}}>
          <Box height = {window.innerHeight}>
          <Typography>Search for videos to add to your lesson:</Typography>
          <VideoSearch></VideoSearch>
          </Box>
        </Grid>
      </Grid>
      :
      <div>Loading</div>
}
    </div>
  )
}

export default CreateLesson