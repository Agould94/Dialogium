import React, {useState, useEffect} from 'react'
import {useParams, useRouteMatch} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { setLesson, addLessonText } from './lessonSlice'
import { setCourse } from '../Courses/courseSlice'
import { setLessonVideos } from '../Videos/videoSlice'

import VideoSearch from '../Videos/VideoSearch'
import VideoCard from '../Videos/VideoCard'


import { 
    Grid,
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    FormControl, 
    Input,
    InputLabel,
    TextField, 
    Button } from '@mui/material'
import userSlice from '../User/userSlice'

function LessonPage() {
    const [loading, setLoading] = useState(true)
    const [displayText, setDisplayText] = useState(true)
    const [text, setText] = useState(true)
    const [generating, setGenerating] = useState(false)
    const match = useRouteMatch()
    const params = useParams()
    const {sectionNum, lessonNum} = useParams()
    const dispatch = useDispatch()
    let course = useSelector(state=>state.courses.course)
    let lesson = useSelector(state=>state.lesson.lesson)
    let lessonVideos = useSelector(state=>state.videos.lessonVideos)
    let user = useSelector(state=>state.user.user)
 
    
    useEffect(()=>{
        if(Object.keys(course).length===0){
        fetch(`/courses/${params.courseId}`)
        .then((r)=>r.json())
        .then((course)=>{
            dispatch(setCourse(course))
            dispatch(setLesson(course.sections[sectionNum].lessons[lessonNum]))
            dispatch(setLessonVideos(course.sections[sectionNum].lessons[lessonNum].videos))
            setLoading(false)
        })
        }else{
        dispatch(setLesson(course.sections[sectionNum].lessons[lessonNum]))
        setLoading(false)
        }
    }, [course, params, dispatch, sectionNum, lessonNum])

    
    let videosToDisplay 
   if(loading === false && lessonVideos.length > 0){
    videosToDisplay = lessonVideos.map((video)=>{
        return(
            <VideoCard video = {video}></VideoCard>
        )
    })
}

    function handleAddText(e){
        e.preventDefault()
        fetch(`/lessons/${lesson.id}`, {
            method: "PATCH", 
            headers:{
                'Content-Type':"application/json"
            }, 
            body: JSON.stringify({
                text: text
            })
        })
        .then((r)=>r.json())
        .then((lesson)=>{
            dispatch(setLesson(lesson))
                console.log(lesson)
                setDisplayText(true)
        })
    }

    function handleChange(e){
        console.log(e.target.value)
        setText(e.target.value)
    }

    function handleDisplayText(){
        setDisplayText(!displayText)
    }

    function handleGenerateText(e){
        e.preventDefault()
        fetch(`/lessoncompletion/${lesson.id}`, {
            method: "PATCH", 
            headers:{
                'Content-Type':"application/json"
            }, 
            body: JSON.stringify({
                topic: course.topic,
                lesson_name: lesson.name,
                subject: lesson.subject
            })
        })
        .then((r)=>r.json())
        .then((lesson)=>{
            dispatch(setLesson(lesson))
                setDisplayText(true)
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
                <Typography variant = 'h4'>{lesson.name}:</Typography>
                <Typography variant = "h5">{lesson.subject}</Typography>
                {lesson.text && displayText ?
                <Box>
                    <div>{lesson.text}</div>
                    {course.creator.id === user.id ? 
                    <Button onClick = {handleDisplayText}>Update Text</Button>
                    :
                    null
                    }
                </Box>
                :
                <Box>
                    {course.creator.id === user.id ?
                    lesson.text ?
                    <Box>
                        <Typography>Add Text to this Lesson:</Typography>
                        <form onSubmit={handleAddText}>
                            <TextField fullWidth label = "Lesson Text" multiline = "true" onChange={handleChange} defaultValue = {lesson.text}></TextField>
                            <Button type = "submit">submit</Button>
                        </form>
                    </Box>
                    :
                    <Box>
                    <Typography>Generate Text for this Lesson:</Typography>
                    <Button onClick = {handleGenerateText}>Generate</Button>
                    <Typography>Or</Typography>
                
                    <Typography>Add Text to this Lesson:</Typography>
                    <form onSubmit={handleAddText}>
                        <TextField fullWidth label = "Lesson Text" multiline = "true" onChange={handleChange} defaultValue = {lesson.text}></TextField>
                        <Button type = "submit">submit</Button>
                    </form>
                </Box>
                    :
                    null
                }
                </Box>
                }
                <Box sx={{display: 'inline-flex', marginTop: 3, flexDirection:'column' }}>
                    <Typography>Lesson Videos:</Typography>
                    <Box sx = {{display: "flex", flexDirection: "row"}}>
                        {videosToDisplay}
                    </Box>
                </Box>
            </Box>
            </Grid>
            {course.creator.id === user.id ?
            <Grid item xs = {6} sx = {{overflow: 'auto'}}>
                <Box height = {window.innerHeight}>
                <Typography>Search for videos to add to your lesson:</Typography>
                 <VideoSearch></VideoSearch>
                </Box>
            </Grid>
            : 
            null
            }
        </Grid>
        }
    </div>
  )
}

export default LessonPage