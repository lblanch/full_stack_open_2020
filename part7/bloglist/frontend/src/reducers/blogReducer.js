import blogService from '../services/blogs'
import { actionShowErrorNotification, actionShowInfoNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
    switch(action.type) {
    case 'INITIALIZE_BLOGS':
        return action.data.sort((a, b) => Number(b.likes) > Number(a.likes))
    case 'ADD_BLOG':
        return [...state, action.data]
    case 'REMOVE_BLOG':
        return state
    case 'LIKE_BLOG':
        return state
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

export default blogReducer