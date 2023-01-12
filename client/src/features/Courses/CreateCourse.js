import React from "react";
import {useState} from "react";
import {Form, FormControl, Button} from 'react-bootstrap'

function CreateCourse(){
    const [topic, setTopic] = useState("")

    function handleSubmit(e){
        e.preventDefault
        fetch(`/completion?topic=${topic}`)
        .then((r=>r.json))
        .then()
    }
    
    return(
        <div>
            <h2>Use This page to Generate a course on any topic of your choosing.</h2>

           <Form onSubmit = {handleSubmit}>
                <FormControl as = "input" type = "text" placeholder="Enter Topic" value = {topic} onChange = {(e)=>setTopic(e.target.value)}></FormControl>
                <Button type = "submit">Submit</Button>
           </Form>
        </div>
    )
}
