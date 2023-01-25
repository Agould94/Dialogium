import React from 'react'

import { Typography, Card, CardMedia, CardContent, Button} from '@mui/material'

import { useDispatch } from 'react-redux'
import {filterLessonVideos } from './videoSlice'

function VideoCard({video}) {
    const dispatch = useDispatch()

    function deleteVideoFromLesson(){
        fetch(`/videos/${video.id}`,{
            method: "DELETE",
        }).then((r=>r.json))
        .then((data)=> {
            dispatch(filterLessonVideos(video.id))
        })
    }
  return (
    <Card sx = {{maxWidth: 320, mt: 3}}>
            <CardMedia sx = {{height: 180}} component = "iframe" image = {video.embed_url} title = {`${video.title} thumbnail`}/>
            <CardContent>
              <Typography variant = "h5" component = "a" href = {video.url} target = "_blank">
                {video.title}
              </Typography>
              <Typography variant="body2" color = 'text.secondary'>
                {video.description ?
                video.description.slice(0, 100)
                :
                null
            }...
              </Typography>
              <Button onClick = {deleteVideoFromLesson}>
                Delete
              </Button>
            </CardContent>
        </Card>
  )
}

export default VideoCard