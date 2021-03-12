import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { actionLikeBlog, actionRemoveBlog } from '../reducers/blogReducer'
import Comments from './Comments'

const Blog = ({ blog }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const username = useSelector(state => state.user.username)

    const likeBlog = (id, likes) => {
        dispatch(actionLikeBlog(id, likes))
    }

    const deleteBlog = (id) => {
        dispatch(actionRemoveBlog(id))
        history.push('/')
    }

    return (
        <div>
            <h2>&quot;{blog.title}&quot;</h2> by {blog.author}
            <p><a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
            <p>
                {blog.likes} likes
                <button type="button" onClick={() => likeBlog(blog.id, Number(blog.likes) + 1)}>
                    like
                </button>
            </p>
            <p>Added by {blog.user.name}</p>
            {
                blog.user.username === username &&
                <button type="button" onClick={() => deleteBlog(blog.id)}>remove</button>
            }
            <Comments comments={blog.comments} id={blog.id} />
        </div>
    )
}

export default Blog
