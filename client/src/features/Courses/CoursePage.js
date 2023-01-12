import React, { useEffect } from "react";
import {useParams} from "react-router-dom"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setCourse} from "./courseSlice"

function CoursePage(){
    let params = useParams()
    const dispatch = useDispatch()
    const course = useSelector(state=> state.course.course)
    console.log(course)
    console.log(params)

    useEffect(()=>{
        fetch(`/courses/${params.id}`)
        .then((r)=>r.json())
        .then((course)=>{
            dispatch(setCourse(course))
        })
    }, [])

    const displaySections = course.sections.map((section, index)=>{
        const lessons = section.lessons.map((lesson)=>{
            return(
            <li key = {lesson.id}>{lesson.name}</li>
            )
        })
        return(
            <div key = {index}>
                <h2>Section {index+1}</h2>
                <h3>Lessons:</h3>
                <ol>
                    {lessons}
                </ol>
            </div>
        )
    })
    return(
        <div>
            <h1>{course.title}</h1>
            <div>{displaySections}</div>
        </div>
    )
}

export default CoursePage