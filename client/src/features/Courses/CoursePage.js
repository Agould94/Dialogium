import React, { useEffect, useState } from "react";
import {useParams, Link} from "react-router-dom"

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Button from '@mui/material/Button';

import {setCourse} from "./courseSlice"

import { setLesson } from "../Lessons/lessonSlice";

import { resetVideos } from "../Videos/videoSlice";

function CoursePage(){
    let params = useParams()
    const dispatch = useDispatch()
    console.log("hello")

    const [loading, setLoading] = useState(true)
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
            <li>
                <Link to = {`/courses/${course.id}/sections/${index}/lessons/${lessonIndex}`} key = {lesson.id}>{lesson.name}</Link>
            </li>
            )
        })
        return(
            <div key = {index}>
                <h2>Section {index+1}:</h2>
                <h3>Lessons:</h3>
                <ol>
                    {lessons}
                </ol>
                <Link to = {`/courses/${course.id}/sections/${index}/new`}>
                    <Button onClick = {clearLesson} variant = "contained">Add Lesson</Button>
                </Link>
            </div>
        )
    })
}
    return(
        <div>
            {loading ?
            <div>loading</div>
            :
            <div>
                <h1>{course.title.slice(6, course.title.length)}</h1>
                <div>{displaySections}</div>
            </div>
            }   
        </div>
    )
}

export default CoursePage