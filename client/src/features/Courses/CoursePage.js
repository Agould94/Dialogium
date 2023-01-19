import React, { useEffect, useState } from "react";
import {useParams, Link as RouterLink} from "react-router-dom"

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { Button, Box, Typography, Accordion, AccordionSummary, AccordionDetails, Link, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import {setCourse} from "./courseSlice";

import { setLesson } from "../Lessons/lessonSlice";

import { resetVideos } from "../Videos/videoSlice";

const LinkBehavior = React.forwardRef((props, ref)=>{
    const {href, ...other} = props
    return <RouterLink data-testid = "custom-Link" ref = {ref} to = {href} {...other}></RouterLink>
})

const theme = createTheme({
    components: {
        MuiLink:{
            defaultProps: {
                component: LinkBehavior,
            },
        },
        MuiButtonBase: {
            defaultProps: {
                component: LinkBehavior,
        },
    },
    },
})


function CoursePage(){
    let params = useParams()
    const dispatch = useDispatch()
    console.log("hello")
    

    const [loading, setLoading] = useState(true)
    const [expanded, setExpanded] = useState(false)
    console.log(loading)
    
    console.log("below")
    //console.log(course)
   
    console.log(params)
    useEffect(()=>{
        if(Object.keys(course).length === 0){
        fetch(`/courses/${params.id}`)
        .then((r)=>r.json())
        .then((course)=>{
            dispatch(setCourse(course))
            setLoading(false)
            dispatch(resetVideos())
            //course = useSelector(state=> state.courses.course)
        })
        }else{
            setLoading(false)
            dispatch(resetVideos())
        }
    }, [])

    const course = useSelector(state=> state.courses.course)
    console.log(course)

    function clearLesson(){
        dispatch(setLesson({}))
    }

    let displaySections
    if(loading === false){
        displaySections = course.sections.map((section, index)=>{
        const lessons = section.lessons.map((lesson, lessonIndex)=>{
            return(
                <Accordion sx = {{borderTop: "1px solid rgba(0,0,0,.5)"}} disableGutters = "true"  >
                <AccordionSummary id = "panel3d-header">
                    <Box sx = {{flexGrow: 1}}>{lesson.name}</Box>
                    <Box>{'\u25BE'}</Box>
                </AccordionSummary>
                <AccordionDetails sx = {{display: "flex"}}>
                    <Box sx = {{ flexGrow: 1}}>
                        <Typography>{lesson.subject}</Typography>
                        <Typography>This lesson has: {lesson.videos.length} videos.</Typography>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "column-reverse"}}>
                    <ThemeProvider theme = {theme}>
                        <Button sx={{fontSize: '10px', marginLeft: 1, }} variant = "text" size = "small" href = {`/courses/${course.id}/sections/${index}/lessons/${lessonIndex}`}>View Lesson {"\u25B6"}</Button>
                    </ThemeProvider>
                    </Box>
                </AccordionDetails>
                </Accordion>
            )
        })
        return(
            <div key = {index}>
                <Accordion sx = {{borderTop: "1px solid rgba(0,0,0,.5)"}} disableGutters = "true"  >
                    <AccordionSummary id = "panel3d-header">
                    <Typography sx = {{fontWeight: "bold"}}>Section {index+1}:</Typography>
                    </AccordionSummary>
                </Accordion>
                {lessons}
                <Accordion sx = {{display: "flex", borderTop: "1px solid rgba(0,0,0,.5)", justifyContent: "right"}}>
                    <AccordionSummary id = "panel3d-header" onClick = {clearLesson}>
                        <ThemeProvider theme = {theme}>
                            <Link href = {`/courses/${course.id}/sections/${index}/new`} underline = "none">
                                Add Lesson to section {index+1}
                            </Link>
                        </ThemeProvider>
                    </AccordionSummary>
                </Accordion>

            </div>
        )
    })
}
    return(
        <Box sx = {{display: "flex", justifyContent: "space-between", marginTop: 3}}>
            {loading ?
                <Box>
                    <Typography>Loading...</Typography>
                </Box>
                :
                <Box sx={{marginLeft: 2 }}>
                    <Typography variant="h4">{course.title.slice(6, course.title.length)}</Typography>
                    <Box sx ={{overflow: "auto"}}>
                        <Box height = {window.innerHeight}>{displaySections}</Box>
                    </Box>
                    
                </Box>
            }   
            <Divider orientation="vertical" flexItem sx={{padding: 2}}></Divider>
            <Box>
                {course.creator ?
                <Typography>This is a course by {course.creator.first_name}</Typography>
                :
                <Typography>This is a site-generated course.</Typography>
                }
                <Typography>Take this course.</Typography>
            </Box>
        </Box>
    )
}

export default CoursePage