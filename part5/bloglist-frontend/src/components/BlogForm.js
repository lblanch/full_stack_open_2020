import React from 'react'

const BlogForm = (props) => (
    <div>
        <h2>create new</h2>
        <form onSubmit={props.createBlog}>
            <input 
                type="text" value={props.title} name="Title" placeholder="title"
                onChange={props.handleTitle}
            />
            <br />
            <input 
                type="text" value={props.author} name="Author" placeholder="author"
                onChange={props.handleAuthor}
            />
            <br />
            <input type="text" value={props.url} name="URL" placeholder="url"
                onChange={props.handleUrl}
            />
            <button type="submit">create</button>
        </form>
    </div>
)

export default BlogForm
