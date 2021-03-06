import blogService from '../services/blogs'
import commentService from '../services/comments'
import { actionShowErrorNotification, actionShowInfoNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
    switch(action.type) {
    case 'INITIALIZE_BLOGS':
        return action.data.sort((a, b) => Number(b.likes) > Number(a.likes))
    case 'ADD_BLOG':
        return [...state, action.data]
    case 'REMOVE_BLOG':
        return state.filter(b => b.id !== action.data)
    case 'UPDATE_BLOG':
        return state.map(b => b.id === action.data.id ? action.data : b).sort((a, b) => Number(b.likes) > Number(a.likes))
    default:
        return state
    }
}

export const actionInitBlogs = () => {
    return async dispatch => {
        try {
            const blogs = await blogService.getAll()
            dispatch({ type: 'INITIALIZE_BLOGS', data: blogs })
        } catch (exception) {
            dispatch(actionShowErrorNotification(exception))
        }
    }
}

export const actionAddBlog = (newBlog) => {
    return async dispatch => {
        try {
            const createdBlog = await blogService.create(newBlog)
            dispatch({ type: 'ADD_BLOG', data: createdBlog })
            dispatch(actionShowInfoNotification(`Blog "${newBlog.title}" by ${newBlog.author} has been added!`))
        } catch (exception) {
            dispatch(actionShowErrorNotification(exception))
        }
    }
}

export const actionRemoveBlog = (id) => {
    return async dispatch => {
        try {
            await blogService.deleteBlog(id)
            dispatch({ type: 'REMOVE_BLOG', data: id })
        } catch (exception) {
            dispatch(actionShowErrorNotification(exception))
        }
    }
}

export const actionLikeBlog = (id, likes) => {
    return async dispatch => {
        try {
            const updatedBlog = await blogService.update(id, { likes })
            dispatch({ type: 'UPDATE_BLOG', data: updatedBlog })
        } catch (exception) {
            dispatch(actionShowErrorNotification(exception))
        }
    }
}

export const actionCommentBlog = (id, comment) => {
    return async dispatch => {
        try {
            const updatedBlog = await commentService.create(id, { comment })
            dispatch({ type: 'UPDATE_BLOG', data: updatedBlog })
        } catch (exception) {
            dispatch(actionShowErrorNotification(exception))
        }
    }
}

export default blogReducer