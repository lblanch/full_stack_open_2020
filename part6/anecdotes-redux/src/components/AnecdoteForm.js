import React from 'react'
import { connect } from 'react-redux'

import { actionAddAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    
    const formValue = event.target.anecdoteContent.value
    event.target.anecdoteContent.value = ''

    props.actionAddAnecdote(formValue)
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

const connectedAnecdoteForm = connect(null, { actionAddAnecdote })(AnecdoteForm)

export default connectedAnecdoteForm