import React from 'react'
import { useDispatch } from 'react-redux'

import { actionCommentBlog } from '../reducers/blogReducer'

const Comments = ({ comments, id }) => {
    const dispatch = useDispatch()
    const addComment = (event) => {
        event.preventDefault()
        const newComment = event.target.comment.value
        event.target.comment.value = ''
        dispatch(actionCommentBlog(id, newComment))
    }

    return (
        <div>
            <h3>comments</h3>
            <form onSubmit={addComment}>
                <input type="text" name="comment" />
                <button type="submit">add comment</button>
            </form>
            <ul>
                {comments.map(comment => <li key={comment}>{comment}</li>)}
            </ul>
        </div>
    )
}

export default Comments