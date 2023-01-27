import React from "react";
import {useState} from "react";
//import {Form, FormControl, Button} from 'react-bootstrap'
import Button from '@mui/material/Button';
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setCourse} from './courseSlice'

function CreateCourse(){
    const [topic, setTopic] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()

    function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        fetch(`/completion?topic=${topic}`)
        .then((r)=>r.json())
        .then(list =>{
            setLoading(false)
            dispatch(setCourse(list))
            history.push(`/courses/${list.id}`)
        })
    }
    
    return(
        <div>
        {loading ? 
        <div>
            <div>Please wait while we generate this course.</div>
        </div>
        :
        <div>
            <h2>Use This page to Generate a course on any topic of your choosing.</h2>

           <form onSubmit = {handleSubmit}>
                <input type = "text" placeholder="Enter Topic" value = {topic} onChange = {(e)=>setTopic(e.target.value)}></input>
                <Button variant = "contained" type = "submit">Submit</Button>
           </form>   
        </div>
        }
        </div>
    )
}

export default CreateCourse