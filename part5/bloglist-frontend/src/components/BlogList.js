import React from 'react'
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

export default BlogList