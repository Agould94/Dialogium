import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CourseCard  from '../Courses/CourseCard';

import { Link, useParams } from "react-router-dom";

import {Box, Typography, Menu, Avatar, Divider, Grid, Button} from '@mui/material'

import { login } from "./userSlice";
import { margin } from "@mui/system";

import { setOther } from "./userSlice";

function UserProfile({handleLogout}){
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const user = useSelector(state => state.user.user)
    const other = useSelector(state=>state.user.other)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(params.id){
        fetch(`/users/${params.id}`)
        .then((r)=>r.json())
        .then((user)=>{
            dispatch(setOther(user))
            setLoading(false)
        })}else{
            setLoading(false)
        }
        }, [dispatch, params.id])
    

    let profile
    if(loading === false){
        if(params.id){
            profile = other
        }else{
            profile = user
        }
    }

    const {courses, created_courses, email, first_name, interests, last_name} =  profile || {first_name:"", last_name:"", email:"", courses:{}, created_courses:{}, interests:[]}
    
    console.log(user)
    console.log(courses)

    console.log(other)
    
    console.log(params.id)
 
    function handleDelete(){
        fetch(`/users/${user.id}`,{
            method: "DELETE", 
        })
        .then((r =>r.json()))
        .then((data)=>console.log(data))
    }


    let displayCourses
    if(courses.length > 0){
        displayCourses = courses.map((course)=>{
            return(
                <Box sx = {{paddingLeft: 1, flexShrink: 0}}>
                <CourseCard course = {course}></CourseCard>
                </Box>
            )
        })
    }

    let createdCourses
    if(Object.keys(created_courses).length > 0){
        createdCourses = created_courses.map((course)=>{
            return(
                <Box sx = {{paddingLeft: 1}}>
                <CourseCard course = {course}></CourseCard>
                </Box>
            )
        })
    }

    console.log(displayCourses)

    return(
        <Box>
        {loading ?
        <Typography>loading...</Typography>
        :
        <Box sx = {{paddingLeft: 4}}> 
            {params.id ?
            null
            :
            <Box sx = {{display: 'flex', justifyContent: "flex-end", marginBottom: -7}}>
                <Button component = {Link} to="/updateUser" >Update Your Profile</Button>
            </Box>
            }
            <Box sx ={{display: 'flex', paddingTop:4, paddingBottom: 0, marginBottom: -1}} >
                <Avatar sx = {{width:80, height: 80, marginRight:3}}>{first_name.charAt(0).toUpperCase()} {last_name ? last_name.charAt(0).toUpperCase() :null}</Avatar>
                <Typography variant = "h2">{first_name.charAt(0).toUpperCase()+first_name.slice(1)} {last_name.charAt(0).toUpperCase()+last_name.slice(1)}</Typography>
            </Box>
            <Box sx = {{display: "flex", paddingLeft: 15, paddingBottom: 0, flexDirection: 'column'}}>
                <Typography>Interests: {interests.join(", ")}</Typography>
                <Typography>Email: {email}</Typography>
                {Object.keys(created_courses).length > 0 ?
                <Typography>Courses Created: {Object.keys(created_courses).length}</Typography>
                :
                null
                }
            </Box>
            <Divider variant = "middle">Courses</Divider>
            <Box sx={{display: "flex", paddingTop: 2, paddingBottom: 2, paddingLeft: 3, flexDirection:'row', justifyContent: 'flex-start', overflowX: 'auto'}}>
                {courses ?
                    displayCourses
                :
                <Typography>You have not signed up for any courses yet</Typography>
                }
            </Box>
            <Divider variant = "middle">Created Courses</Divider>
            <Box sx={{display: "flex", paddingTop: 2, paddingBottom: 2, paddingLeft: 3, flexDirection:'row', justifyContent: 'flex-start'}}>
                {createdCourses ?
                    createdCourses
                :
                <Typography>You have not created for any courses yet</Typography>
                }
                
            </Box>
            {params.id ? 
            null :
            <Box sx = {{display: "flex", justifyContent: "center"}}>
                <Button variant = "contained" onClick = {handleLogout}>Logout</Button>
                <Button variant = "contained" onClick = {handleDelete}>Delete Your Profile.</Button>
            </Box>
            }
        </Box>
    }
    </Box>
    )
        
}  

export default UserProfile