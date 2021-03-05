let timeoutId

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW': {
      clearTimeout(timeoutId)
      timeoutId = action.data.timeoutId
      return action.data.message
    } 
    case 'HIDE':
      return ''
    default:
      return state
  }
}

export const actionShowNotification = (message) => ({ type: 'SHOW', data: message})
export const actionHideNotification = () => ({ type: 'HIDE'})

export const actionSetNotification = (message, seconds) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(() => dispatch({ type: 'HIDE'}), seconds * 1000)
    dispatch({ type: 'SHOW', data: { message: message, timeoutId: timeoutId}})
  }
} 

export default notificationReducer