import React, { useEffect, useState } from 'react'

import {useSelector, useDispatch} from "react-redux"

import { setCourses } from './courseSlice'

import { Box, Card, CardContent, Button, Typography, Grid } from '@mui/material'

import CourseCard from './CourseCard'

function CourseList() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const courses = useSelector(state=> state.courses.courses)

    
    console.log(courses)
    useEffect(()=>{
        fetch('/courses')
        .then((r)=>r.json())
        .then((courses)=>{
            dispatch(setCourses(courses))
            setLoading(false)
        })
    }, [])

    let coursesToDisplay
  
     if(loading === false){
        coursesToDisplay = courses.map((course)=>{
        return(
            <Box sx={{justifyContent: 'center'}}>
                <CourseCard course = {course}></CourseCard>
            </Box>
        )
    })
    }

    return (
        
        <div>
            {loading ?
            <div>loading...</div>
            :
            <div>
            <Box sx = {{display: 'grid', gridTemplateColumns: 'repeat(4, 2fr)', gap: 2, m: 3, flexWrap: 'wrap' }} container spacing={3}>
                {coursesToDisplay}
            </Box>
            </div>
        }
        </div>
    )
}

export default CourseList