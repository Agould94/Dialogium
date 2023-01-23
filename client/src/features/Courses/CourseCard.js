import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCourse } from './courseSlice'



import { Box, Card, CardContent, Button, Typography, CardMedia} from '@mui/material'

import Default from "../../resources/placeholder-320x180.jpg"

function CourseCard({course}) {
    const dispatch = useDispatch()
    const history = useHistory()

    function handleCourseClick(){
        dispatch(setCourse(course))
        history.push(`/courses/${course.id}`)
        console.log(course)
    }


    function numberOfLessons(){
        const lessons = course.sections.map((section)=> section.lessons.length)
        const numberOfLessons = lessons.reduce((a, b)=> a+b, 0)
        return numberOfLessons
    }

    const allLessons = course.sections.map((section)=> section.lessons).flat()
    //console.log(allLessons)
    let firstVideoLesson
    let image = Default
    if (allLessons.some(lesson => lesson.videos.length >0)){
        firstVideoLesson = allLessons.find(lesson => lesson.videos.length > 0)
        if(firstVideoLesson.videos[0].thumbnail){
            image = firstVideoLesson.videos[0].thumbnail
        }
    }
    
   

    //const image = course.sections[0].lessons[0].thumbnail || Default
    
  return (
    <Card onClick = {handleCourseClick} sx = {{width: 320}}>
        <CardMedia sx ={{height: 180}} image={image}/>
        <CardContent sx = {{bgcolor: '#bbe1fa' }}>
            <Typography sx = {{fontWeight: 'bold'}}>
                {course.title.slice(6, course.title.length)}
            </Typography>
            <Typography >
                Topic: {course.topic}
            </Typography>
            <Typography>
                Lessons: {numberOfLessons()}
            </Typography>
            <Typography variant= "caption" sx = {{mt: -5, p: -3}}>
                Creator: {course.creator.first_name}
            </Typography>
        </CardContent>
    </Card>
  )
  }


export default CourseCard