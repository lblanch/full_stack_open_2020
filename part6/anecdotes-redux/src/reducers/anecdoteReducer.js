import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      return state.map(a => a.id !== action.data.id ? a : action.data)
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

export const actionVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, {...anecdote, votes: anecdote.votes + 1})
    dispatch({ type: 'VOTE', data: updatedAnecdote})
  }
}

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