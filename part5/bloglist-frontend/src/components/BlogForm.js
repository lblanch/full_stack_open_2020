import React, { useState } from 'react'

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
            <form onSubmit={addBlog}>
                <input 
                    type="text" value={title} name="Title" placeholder="title"
                    onChange={(event) => setTitle(event.target.value)}
                />
                <br />
                <input 
                    type="text" value={author} name="Author" placeholder="author"
                    onChange={(event) => setAuthor(event.target.value)}
                />
                <br />
                <input type="text" value={url} name="URL" placeholder="url"
                    onChange={(event) => setUrl(event.target.value)}
                />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm
