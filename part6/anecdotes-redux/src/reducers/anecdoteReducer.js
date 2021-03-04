import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      const anecdoteVote = state.find(a => a.id === action.data.id)
      const newAnecdote = {...anecdoteVote, votes: anecdoteVote.votes +1}
      return state.map(a => a.id !== action.data.id ? a : newAnecdote)
    }
    case 'ADD_ANECDOTE': {
      return [...state, action.data]
    }
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const actionVote = (id) => ({ type: 'VOTE', data: { id: id }})

export const actionInitAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'INIT_ANECDOTES', data: anecdotes })
  }
}

export const actionAddAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew({ content: content, votes: 0 })
    dispatch({ type: 'ADD_ANECDOTE', data: anecdote })
  }
}

export default anecdoteReducer