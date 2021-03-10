import React from 'react'
import { useSelector } from 'react-redux'

import Blog from './Blog'

const BlogList = () => {
    const { blogs, username } = useSelector(state => ({ blogs: state.blogs, username: state.user.username }))

    const likeBlog = () => {
        console.log('likeBlog')
    }

    const deleteBlog = () => {
        console.log('deleteBlog')
    }

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
                        loggedUser={username}
                    />
                ))}
            </div>
        </div>
    )
}

export default BlogList