const notificationReducer = (state = { message: '', type: '' }, action) => {
    switch(action.type) {
    case 'SHOW_INFO_NOTIFICATION':
        return { message: action.data, type: 'info' }
    case 'SHOW_ERROR_NOTIFICATION':
        return { message: action.data, type: 'error' }
    case 'HIDE_NOTIFICATION':
        return { message: '', type: '' }
    default:
        return state
    }
}

export const actionShowInfoNotification = (message) => {
    return dispatch => {
        dispatch({ type: 'SHOW_INFO_NOTIFICATION', data: message })
        setTimeout(() => {
            dispatch({ type: 'HIDE_NOTIFICATION' })
        }, 5000)
    }
}

export const actionShowErrorNotification = (error) => {
    return dispatch => {
        let message = ''
        if (error.response.data.error) {
            console.log('Error: ', error.response.data.error)
            message = error.response.data.error
        } else {
            console.log('Error: ', error.message)
            message = error.message
        }
        dispatch({ type: 'SHOW_ERROR_NOTIFICATION', data: message })
        setTimeout(() => {
            dispatch({ type: 'HIDE_NOTIFICATION' })
        }, 5000)
    }
}

export default notificationReducer