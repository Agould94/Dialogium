import React from 'react'
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Button,
} from "@mui/material";
//import { makeStyles } from '@mui/styles';

import { Link } from "react-router-dom";
import { getThemeProps } from '@mui/system';
import { ClassNames } from '@emotion/react';

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
 
  return (
    <AppBar position = "static" sx={{background: "#c3e0ce"}}>
        <CssBaseline/>
        <Toolbar>
            <Typography variant = "h5" component={Link} to = "/" sx={{textDecoration: "none", color: "black", marginLeft: "-20px", marginRight: "10px"}}>
                Dialogium
            </Typography>
            <div >
                <Button sx = {{color: 'black', marginTop: '5px'}} variant = "text" component= {Link} to = "/profile" >
                    Profile
                </Button>
                <Button sx = {{color: 'black', marginTop: '5px'}} variant = "text" component= {Link} to = "/login" >
                    Login
                </Button>
                <Button sx = {{color: 'black', marginTop: '5px'}} variant = "text" component= {Link} to = "/signup" >
                    Signup
                </Button>
                <Button sx = {{color: 'black', marginTop: '5px'}} variant = "text" component= {Link} to = "/courses/create" >
                    Create a course
                </Button>
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar