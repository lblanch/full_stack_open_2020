import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionLikeBlog, actionRemoveBlog } from '../reducers/blogReducer'

import Blog from './Blog'

const BlogList = () => {
    const dispatch = useDispatch()
    const { blogs, username } = useSelector(state => ({ blogs: state.blogs, username: state.user.username }))

    const likeBlog = (id, likes) => {
        dispatch(actionLikeBlog(id, likes))
    }

    const deleteBlog = (id) => {
        dispatch(actionRemoveBlog(id))
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