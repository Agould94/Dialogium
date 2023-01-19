import React from 'react'
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Button,
  Box,
} from "@mui/material";
//import { makeStyles } from '@mui/styles';

import { Link } from "react-router-dom";
import { getThemeProps } from '@mui/system';
import { ClassNames } from '@emotion/react';

import { useSelector } from 'react-redux';

// const useStyles = makeStyles((theme) =>({
//     navlinks: {
//         marginLeft: theme.spacing(5),
//         display: "flex"
//     }, 
//     link: {
//         textDecoration: "none",
//         color: "white",
//         fontSize: "20px",
//         marginLeft: "1px",
//         "&:hover": {
//             color: "yellow",
//             borderBottom: "1px solid white",
//         }
//     }
// })
// )

function NavBar() {
    //const classes = useStyles()

    const user = useSelector(state=>state.user.user)
  return (
    <AppBar position = "static" sx={{background: "#c3e0ce"}}>
        <CssBaseline/>
        <Toolbar>
            
            <Typography variant = "h5" component={Link} to = "/" sx={{textDecoration: "none", color: "black", marginLeft: "-20px", marginRight: "10px"}}>
                Dialogium
            </Typography>
            <Box sx = {{display: "flex", flexGrow: 1}}>
                <Button sx = {{color: 'black', marginTop: '5px'}} variant = "text" component= {Link} to = "/courses/create" >
                    Create a course
                </Button>
            </Box>
                {user ?
                <Box>
                 <Button sx = {{color: 'black', marginTop: '5px'}} variant = "text" component= {Link} to = "/profile" >
                    Profile
                </Button>
                <Button sx = {{color: 'black', marginTop: '5px'}} variant = "text" component= {Link} to = "/logout">
                    Logout
                </Button>
                </Box>
                :
                <div>
                    <Button sx = {{color: 'black', marginTop: '5px'}} variant = "text" component= {Link} to = "/login" >
                    Login
                    </Button>
                    <Button sx = {{color: 'black', marginTop: '5px'}} variant = "text" component= {Link} to = "/signup" >
                        Signup
                    </Button>
                </div>
            }
            
        </Toolbar>
    </AppBar>
  )
}

export default NavBar