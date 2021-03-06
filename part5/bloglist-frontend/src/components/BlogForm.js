import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()

        const newBlog = {
            title: title,
            author: author,
            url: url
        }

        setTitle('')
        setAuthor('')
        setUrl('')
        await createBlog(newBlog)
    }

    return (
        <div>
            <h2>create new</h2>
            <form aria-label="Create new blog" onSubmit={addBlog}>
                <input
                    type="text" value={title} aria-label="Title" placeholder="title"
                    onChange={(event) => setTitle(event.target.value)}
                />
                <br />
                <input
                    type="text" value={author} aria-label="Author" placeholder="author"
                    onChange={(event) => setAuthor(event.target.value)}
                />
                <br />
                <input type="text" value={url} aria-label="URL" placeholder="url"
                    onChange={(event) => setUrl(event.target.value)}
                />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm
