import React from 'react'

import {Button, Card, CardMedia, CardContent, Typography, CardActions} from '@mui/material'

function VideoSearchCard({video, handleAddToLesson}) {
  return (
    <Card sx = {{maxWidth: 320, mt: 3}}>
          <CardMedia sx = {{height: 180}} image = {video.snippet.thumbnails.medium.url} title = {`${video.snippet.title} thumbnail`}/>
          <CardContent>
            <Typography variant = "h5" component = "div">
              {video.snippet.title}
            </Typography>
            <Typography variant="body2" color = 'text.secondary'>
              {video.snippet.description}
            </Typography>
            <Button value = {video.id.videoId} size = "small" variant = "contained" color = "success" onClick = {handleAddToLesson}>
              Add To Lesson
            </Button>
          </CardContent>
        </Card>
  )
}

export default VideoSearchCard