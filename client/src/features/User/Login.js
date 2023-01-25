import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { login } from './userSlice'

import { useHistory } from 'react-router-dom'

import {Box, Typography, TextField, Button, Card, CardContent} from "@mui/material"

function Login({ setUser }) {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const history = useHistory()
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          dispatch(login(user))
          history.push('/')
      });
      }
    });
  }

  return (
    <Box sx = {{display: "flex", justifyContent: "center", alignContent:"center"}}>
      <Card sx = {{marginTop: 10, width: 320}}>
      <form onSubmit={handleSubmit}>
        <CardContent sx={{display: "flex", flexDirection: "column", justifyContent: "center", }}>
        <Typography variant = "h4" sx = {{display: "flex", marginBottom: 3, justifyContent: "center", marginLeft:-1}}>Login</Typography>
        <TextField
          label = "First Name"
          type="text"
          id="loginFirstName"
          autoComplete="off"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{marginBottom: 4}}
        />
        <TextField
          label = "password"
          type="password"
          id="loginPassword"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{marginBottom: 4}}
        />
        <Button variant= "contained" type="submit">Login</Button>
        </CardContent>
      </form>
      </Card>
    </Box>
  );
}

export default Login;
