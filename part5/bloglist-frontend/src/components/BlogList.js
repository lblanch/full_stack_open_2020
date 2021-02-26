import React from 'react'
import PropTypes from 'prop-types'

import Blog from './Blog'

const BlogList = ({ blogs, likeBlog, deleteBlog, loggedUser }) => {
    return (
        <div>
            <h2>blog list</h2>
            <div>
                {blogs.map(blog => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        likeBlog={likeBlog}
                        deleteBlog={deleteBlog}
                        loggedUser={loggedUser}
                    />
                ))}
            </div>
        </div>
    )
}

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    likeBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    loggedUser: PropTypes.string.isRequired
}

export default BlogList