import React from 'react'

import Togglable from './Togglable'

const Blog = ({ blog }) => (
    <div className="blog">
        "{blog.title}" by {blog.author}
        <Togglable showLabel="view" hideLabel="hide">
            <p>{blog.url}</p>
            <p>
                likes {blog.likes} 
                <button type="button">like</button>
            </p>
            <p>{blog.user.name}</p>
        </Togglable>
    </div>
)

export default Blog
