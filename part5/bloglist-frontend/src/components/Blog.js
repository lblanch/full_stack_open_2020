import React from 'react'

import Togglable from './Togglable'

const Blog = ({ blog, likeBlog }) => (
    <div className="blog">
        "{blog.title}" by {blog.author}
        <Togglable showLabel="view" hideLabel="hide">
            <p>{blog.url}</p>
            <p>
                likes {blog.likes} 
                <button type="button" onClick={() => likeBlog(blog.id, Number(blog.likes) + 1)}>
                    like
                </button>
            </p>
            <p>{blog.user.name}</p>
        </Togglable>
    </div>
)

export default Blog
