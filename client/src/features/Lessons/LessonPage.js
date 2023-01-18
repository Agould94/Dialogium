import React, {useState, useEffect} from 'react'
import {useParams, useRouteMatch} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { setLesson } from './lessonSlice'
import { setCourse } from '../Courses/courseSlice'

import VideoSearch from '../Videos/VideoSearch'


import { Grid, Box, Typography, Card, CardMedia, CardContent } from '@mui/material'

function LessonPage() {
    const [loading, setLoading] = useState(true)
    const match = useRouteMatch()
    const params = useParams()
    const {sectionNum, lessonNum} = useParams()
    const dispatch = useDispatch()
    let course = useSelector(state=>state.courses.course)
    let lesson = useSelector(state=>state.lesson.lesson)
    console.log(params)
    
    useEffect(()=>{
        console.log("effect")
        if(Object.keys(course).length===0){
        fetch(`/courses/${params.courseId}`)
        .then((r)=>r.json())
        .then((course)=>{
            dispatch(setCourse(course))
            console.log(course)
            dispatch(setLesson(course.sections[sectionNum].lessons[lessonNum]))
            setLoading(false)
        })
        }else{
        dispatch(setLesson(course.sections[sectionNum].lessons[lessonNum]))
        setLoading(false)
        }
    }, [course, params, dispatch, sectionNum, lessonNum])
   
    function addVideoToLesson(){
        
    }    
    console.log(params.lessonNum)
   
    
    console.log(lesson.videos)
    let videosToDisplay 
   if(loading === false){
    videosToDisplay = lesson.videos.map((video)=>{
        return(
            <Card sx = {{maxWidth: 320, mt: 3}}>
            <CardMedia sx = {{height: 180}} component = "iframe" image = {video.embed_url} title = {`${video.title} thumbnail`}/>
            <CardContent>
              <Typography variant = "h5" component = "a" href = {video.url} target = "_blank">
                {video.title}
              </Typography>
              <Typography variant="body2" color = 'text.secondary'>
                {video.description ?
                video.description.slice(0, 100)
                :
                null
            }...
              </Typography>
            </CardContent>
          </Card>
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