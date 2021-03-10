import React from 'react'
import { useDispatch } from 'react-redux'
import { actionAddBlog } from '../reducers/blogReducer'

const BlogForm = () => {
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
    }

    return (
        <div>
            <h2>create new</h2>
            <form aria-label="Create new blog" onSubmit={addBlog}>
                <input type="text" name="title" aria-label="Title" placeholder="title" />
                <br />
                <input type="text" name="author" aria-label="Author" placeholder="author" />
                <br />
                <input type="text" name="url" aria-label="URL" placeholder="url" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm
