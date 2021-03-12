import { Button, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { actionAddBlog } from '../reducers/blogReducer'

const BlogForm = ({ parentRef }) => {
    const dispatch = useDispatch()

    const addBlog = (event) => {
        event.preventDefault()

        const newBlog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value
        }
        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''

        dispatch(actionAddBlog(newBlog))
        parentRef.current.toggleVisibility()
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>Create Blog</Typography>
            <form aria-label="Create new blog" onSubmit={addBlog}>
                <TextField fullWidth required name="title" aria-label="Title" label="Title" />
                <TextField fullWidth required name="author" aria-label="Author" label="Author" />
                <TextField fullWidth required name="url" aria-label="URL" label="URL" />
                <Button type="submit">create</Button>
            </form>
        </div>
    )
}

export default BlogForm
