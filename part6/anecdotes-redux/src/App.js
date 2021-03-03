import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { actionVote, actionAddAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes > a.votes))

  const vote = (id) => dispatch(actionVote(id))

  const addAnecdote = (event) => {
    event.preventDefault()
    dispatch(actionAddAnecdote(event.target.anecdoteContent.value))
    event.target.anecdoteContent.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdoteContent" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App