const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    default: 
      return state
  }
}

export const actionFilter = (filter) => ({ type: 'SET_FILTER', data: filter })

export default filterReducer