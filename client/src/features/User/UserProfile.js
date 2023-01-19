import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CourseCard  from '../Courses/CourseCard';

import {Box, Typography, Menu, Avatar, Divider, Grid, Button} from '@mui/material'


function UserProfile({handleLogout}){
    const user = useSelector(state => state.user.user)
    const {courses, created_courses, email, first_name, interests, last_name} = user
    const dispatch = useDispatch() 
    console.log()
    let displayCourses
    if(courses.length > 0){
        displayCourses = courses.map((course)=>{
            return(
                <CourseCard course = {course}></CourseCard>
            )
        })
    }



    return(
        <Box sx = {{paddingLeft: 4}}> 
            <Box sx ={{display: 'flex', paddingTop:4, paddingBottom: 0}} >
                <Avatar sx = {{width:80, height: 80, marginRight:3}}>{first_name.charAt(0).toUpperCase()} {last_name.charAt(0).toUpperCase()}</Avatar>
                <Typography variant = "h2">{first_name.charAt(0).toUpperCase()+first_name.slice(1)} {last_name.charAt(0).toUpperCase()+last_name.slice(1)}</Typography>
            </Box>
            <Box sx = {{display: "flex", paddingLeft: 15, paddingBottom: 0}}>
                <Typography>Email: {email}</Typography>
                {created_courses.length > 0 ?
                <Typography>Courses Created: {created_courses.length()}</Typography>
                :
                null
                }
            </Box>
            <Divider variant = "middle">Courses</Divider>
            <Box sx={{paddingTop: 2, paddingBottom: 2, paddingLeft: 3}}>
                {courses.length > 0 ?
                    {displayCourses}
                :
                <Typography>You have not signed up for any courses yet</Typography>
                }
                
            </Box>
            <Divider variant = "middle">Created Courses</Divider>
            <Button variant = "contained" onClick = {handleLogout}>Logout</Button>
        </Box>

    )
}  

export default UserProfile