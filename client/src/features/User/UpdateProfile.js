import React, {useState} from 'react'

import { useHistory, useParams } from 'react-router-dom'

import { TextField, Button, Typography, Box, Avatar, Divider } from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'

import { updateInterests, setUser } from './userSlice'

function UpdateProfile() {
    const history = useHistory()
    const params = useParams()

    const dispatch = useDispatch()

    const user = useSelector(state=>state.user.user)
    const {first_name, last_name, interests, created_courses} = user
    const [firstName, setFirstName] = useState(first_name)
    const [lastName, setLastName] = useState(last_name)
    const [email, setEmail]= useState(user.email)
    const [interest, setInterest] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/users/${user.id}`,{
            method: "PATCH",
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                interests: interests,
            })
        })
        .then((r)=>r.json())
        .then((user)=>{
        dispatch(setUser(user))
        history.push('/profile')
        }
        )
    }

    function addInterestToInterests(){
        dispatch(updateInterests(interest))
        setInterest("")
    }


    function handleFirstNameChange(e){
        setFirstName(e.target.value)
    }
    function handleLastNameChange(e){
        setLastName(e.target.value)
    }
    function handleEmailChange(e){
        setEmail(e.target.value)
    }
    function handleInterestChange(e){
        setInterest(e.target.value)
    }


  return (
    <Box>
        <Box sx ={{display: 'flex', paddingTop:4, paddingBottom: 0, marginBottom: -1}} >
        <Avatar sx = {{width:80, height: 80, marginRight:3}}>{first_name.charAt(0).toUpperCase()} {last_name ? last_name.charAt(0).toUpperCase() :null}</Avatar>
        <Typography variant = "h2">{first_name.charAt(0).toUpperCase()+first_name.slice(1)} {last_name.charAt(0).toUpperCase()+last_name.slice(1)}</Typography>
        </Box>
        <Box sx = {{display: "flex", paddingLeft: 15, paddingBottom: 0, flexDirection: 'column'}}>
        <Typography>Interests: {user.interests.join(", ")}</Typography>
        <Typography>Email: {user.email}</Typography>
        {Object.keys(created_courses).length > 0 ?
        <Typography>Courses Created: {Object.keys(created_courses).length}</Typography>
        :
        null
        }
        </Box>
        <Divider></Divider>
        <form onSubmit={handleSubmit}>
            <Box sx = {{display: "flex", flexDirection: "column", maxWidth: "25%", marginLeft: 15}}>
            <TextField label = "First Name" value = {firstName} onChange = {handleFirstNameChange}></TextField>
            <TextField label = "Last Name" value = {lastName} onChange = {handleLastNameChange}></TextField>
            <TextField label = "Email" value = {email} onChange = {handleEmailChange}></TextField>
            <TextField label = "interest" value = {interest} onChange = {handleInterestChange}></TextField>
            <Button onClick = {addInterestToInterests}>Add Interest</Button>
            <Button type = "submit">Submit</Button>
            </Box>
        </form>
    </Box>
  )
}

export default UpdateProfile