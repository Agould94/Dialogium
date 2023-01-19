import React, {useState, useEffect} from 'react'
import {useParams, useRouteMatch} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { setLesson } from './lessonSlice'
import { setCourse } from '../Courses/courseSlice'
import { setLessonVideos } from '../Videos/videoSlice'

import VideoSearch from '../Videos/VideoSearch'
import VideoCard from '../Videos/VideoCard'


import { Grid, Box, Typography, Card, CardMedia, CardContent } from '@mui/material'

function LessonPage() {
    const [loading, setLoading] = useState(true)
    const match = useRouteMatch()
    const params = useParams()
    const {sectionNum, lessonNum} = useParams()
    const dispatch = useDispatch()
    let course = useSelector(state=>state.courses.course)
    let lesson = useSelector(state=>state.lesson.lesson)
    let lessonVideos = useSelector(state=>state.videos.lessonVideos)
    console.log(params)
    console.log(lesson)
    console.log(lessonVideos)
    
    useEffect(()=>{
        if(Object.keys(course).length===0){
        fetch(`/courses/${params.courseId}`)
        .then((r)=>r.json())
        .then((course)=>{
            dispatch(setCourse(course))
            console.log(course)
            dispatch(setLesson(course.sections[sectionNum].lessons[lessonNum]))
            dispatch(setLessonVideos(course.sections[sectionNum].lessons[lessonNum].videos))
            setLoading(false)
        })
        }else{
        dispatch(setLesson(course.sections[sectionNum].lessons[lessonNum]))
        setLoading(false)
        }
    }, [course, params, dispatch, sectionNum, lessonNum])
   
     
    console.log(params.lessonNum)

    
    console.log(lessonVideos)
    let videosToDisplay 
   if(loading === false && lessonVideos.length > 0){
    videosToDisplay = lessonVideos.map((video)=>{
        return(
            <VideoCard video = {video}></VideoCard>
        )
    })
}

  return (
    <div>
        {loading ?
            <div>Loading...</div>
            :
        <Grid container columnSpacing={{xs:2}}>
            <Grid item xs = {6} >
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 3, marginRight: 10, flexDirection: 'column'}}>
            <Typography sx = {{fontStyle: 'h6'}}>{lesson.name}</Typography>
                <Box sx={{display: 'inline-flex', marginTop: 3, }}>
                    {lesson.text ?
                    <div>{lesson.text}</div>
                    :
                    null
                    }
                
                <br></br>
                    <Box>
                        {videosToDisplay}
                    </Box>
                </Box>
                <div>
                    <form>
                        <label>
                            Add a Video to this Lesson:
                        </label>
                        <br></br>
                        <input type = "text"></input>
                    </form>
                </div>
                </Box>
            </Grid>
            <Grid item xs = {6} sx = {{overflow: 'auto'}}>
                <Box height = {window.innerHeight}>
                <Typography>Search for videos to add to your lesson:</Typography>
                 <VideoSearch></VideoSearch>
                </Box>
                    
            </Grid>
        </Grid>
        }
    </div>
  )
}

export default LessonPage