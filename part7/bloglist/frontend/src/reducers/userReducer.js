import loginService from '../services/login'
import blogService from '../services/blogs'

import { actionShowErrorNotification, actionShowInfoNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
    switch(action.type) {
    case 'LOGIN': {
        blogService.setToken(action.data.token)
        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(action.data))
        return action.data
    }
    case 'LOAD_FROM_STORAGE': {
        const localUser = window.localStorage.getItem('loggedBloglistUser')
        if (localUser) {
            return JSON.parse(localUser).user
        } else {
            return null
        }
    }
    case 'LOGOUT': {
        blogService.setToken(null)
        window.localStorage.removeItem('loggedBloglistUser')
        return null
    }
    default:
        return state
    }
}

export const actionLogin = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await loginService.login(credentials)
            dispatch({ type: 'LOGIN', data: response })
            dispatch(actionShowInfoNotification(`User "${response.name}" has logged in!`))
        } catch (exception) {
            dispatch(actionShowErrorNotification(exception))
        }
    }
}

export const actionLoginFromStorage = () => (dispatch) => dispatch({ type: 'LOAD_FROM_STORAGE' })

export const actionLogout = () => {
    return (dispatch, getStatus) => {
        const name = getStatus().user.name
        dispatch({ type: 'LOGOUT' })
        dispatch(actionShowInfoNotification(`User "${name}" has logged out!`))
    }
}

export default userReducer