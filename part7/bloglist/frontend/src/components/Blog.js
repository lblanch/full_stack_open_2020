import React from 'react'
import PropTypes from 'prop-types'

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

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    loggedUser: PropTypes.string.isRequired
}

export default Blog
