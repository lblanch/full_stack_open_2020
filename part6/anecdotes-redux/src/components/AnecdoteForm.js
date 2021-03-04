import React from 'react'
import { useDispatch } from 'react-redux'

import { actionAddAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    
    const formValue = event.target.anecdoteContent.value
    event.target.anecdoteContent.value = ''

    const createdAnecdote = await anecdoteService.createNew({ 
      content: formValue,
      votes: 0
    })
    
    dispatch(actionAddAnecdote(createdAnecdote))
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