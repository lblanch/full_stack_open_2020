import React from 'react'
import { useDispatch } from 'react-redux'

import { actionAddAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    dispatch(actionAddAnecdote(event.target.anecdoteContent.value))
    event.target.anecdoteContent.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdoteContent" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm