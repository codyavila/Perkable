import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  })
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  )

  const user = JSON.parse(localStorage.getItem('profile'))

  console.log(user)

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (currentId === null) {
      dispatch(createPost({ ...postData, name: user?.profile?.name }))
      clear()
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.profile?.name })
        )
        clear()
    }
  }

  if (!user?.profile?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Sign in to start logging and reviewing games!
        </Typography>
      </Paper>
    )
  }

  const clear = () => {
    setCurrentId(null)
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}>
        <Typography variant='h6'>
          {currentId ? 'Editing' : 'Creating'} a Game Review
        </Typography>
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          multiline
          minRows={5}
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags (coma separated)'
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth>
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default Form
