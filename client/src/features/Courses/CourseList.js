import React, { useEffect, useState } from 'react'

import {useSelector, useDispatch} from "react-redux"

import { setCourses, filterCourses, setCategories, filterCoursesByCategory } from './courseSlice'

import { Box, Card, CardContent, Button, Typography, Grid, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import CourseCard from './CourseCard'

function CourseList() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState(null)
    const courses = useSelector(state=> state.courses.courses)
    const filteredCourses = useSelector(state=>state.courses.filteredCourses)
    const coursesByCategory = useSelector(state =>state.courses.coursesByCategory)
    const categories = useSelector(state=>state.courses.categories)
    function handleFilterCourses(e){
        dispatch(filterCourses(e.target.value))
    }

    useEffect(()=>{
        fetch('/courses')
        .then((r)=>r.json())
        .then((courses)=>{
            dispatch(setCourses(courses))
            fetch("/all_categories")
            .then((r)=>r.json())
            .then((categories)=>{
                dispatch(setCategories(categories))
                setLoading(false)
            })
            
        })
    }, [])

    let coursesToDisplay
  
     if(loading === false){
        if(filteredCourses){ 
            coursesToDisplay = (category ? filteredCourses.filter((course)=>course.category===category) : filteredCourses).map((course)=>{
                return(
                    <Box sx={{justifyContent: 'center'}}>
                        <CourseCard course = {course}></CourseCard>
                    </Box>
                )
                })
        }else{
        coursesToDisplay = (category ? courses.filter((course)=> course.category===category) : courses).map((course)=>{
        return(
            <Box sx={{justifyContent: 'center'}}>
                <CourseCard course = {course}></CourseCard>
            </Box>
        )
        })
        }

    }

    function handleCategoryChange(e){
            setCategory(e.target.value)
        }
    let categoriesToDisplay
    if(loading == false){
        categoriesToDisplay = categories.map((category)=>{
            return(
                <MenuItem key = {category} value = {category}>{category}</MenuItem>
            )
        })
    }

    return (
        
        <div>
            {loading ?
            <div>loading...</div>
            :
            <div>
            <Box sx = {{display: "flex", justifyContent: "flex-end"}}>
                <FormControl variant = "standard" sx = {{width: "200px", marginRight: 2}}>
                    <InputLabel>Category</InputLabel>
                    <Select value = {category} label = "Category" onChange = {handleCategoryChange}>
                        <MenuItem value = {false}>All</MenuItem>
                        {categoriesToDisplay}
                    </Select>
                </FormControl>
                <TextField label = "Search..." variant = "standard" onChange = {handleFilterCourses}></TextField>
            </Box>
            <Box sx = {{display: 'grid', gridTemplateColumns: 'repeat(4, 2fr)', gap: 2, m: 3, flexWrap: 'wrap' }} container spacing={3}>
                {coursesToDisplay}
            </Box>
            </div>
        }
        </div>
    )
}

export default CourseList