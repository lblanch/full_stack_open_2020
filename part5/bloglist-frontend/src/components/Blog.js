import React from 'react'

import Togglable from './Togglable'

const Blog = ({ blog, likeBlog, deleteBlog, loggedUser }) => (
    <div className="blog">
        &quot;{blog.title}&quot; by {blog.author}
        <Togglable showLabel="view" hideLabel="hide">
            <p>{blog.url}</p>
            <p>
                likes {blog.likes}
                <button type="button" onClick={() => likeBlog(blog.id, Number(blog.likes) + 1)}>
                    like
                </button>
            </p>
            <p>{blog.user.name}</p>
            {
                blog.user.username === loggedUser &&
                <button type="button" onClick={() => deleteBlog(blog.id)}>remove</button>
            }
        </Togglable>
    </div>
)

export default Blog
