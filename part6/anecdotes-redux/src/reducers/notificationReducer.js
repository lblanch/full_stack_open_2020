const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY': 
      return action.data
    default:
      return state
  }
}

export const actionNotify = (message) => ({ type: 'NOTIFY', data: message})

export default notificationReducer