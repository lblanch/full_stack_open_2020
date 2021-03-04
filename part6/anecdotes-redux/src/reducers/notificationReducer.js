let counter = 0

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW': {
      counter++
      return action.data
    } 
    case 'HIDE': {
      counter --
      return counter === 0 ? '' : state
    }
    default:
      return state
  }
}

export const actionShowNotification = (message) => ({ type: 'SHOW', data: message})
export const actionHideNotification = () => ({ type: 'HIDE'})

export const actionSetNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch({ type: 'SHOW', data: message})
    setTimeout(() => dispatch({ type: 'HIDE'}), seconds * 1000)
  }
} 

export default notificationReducer