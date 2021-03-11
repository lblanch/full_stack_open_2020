import { actionShowErrorNotification } from './notificationReducer'
import usersService from '../services/users'

const usersReducer = (state = [], action) => {
    switch(action.type) {
    case 'INIT_USERS':
        return action.data
    default:
        return state
    }
}

export const actionInitUsers = () => {
    return async dispatch => {
        try {
            const users = await usersService.getAll()
            dispatch({ type: 'INIT_USERS', data: users })
        } catch (exception) {
            dispatch(actionShowErrorNotification(exception))
        }
    }
}

export default usersReducer