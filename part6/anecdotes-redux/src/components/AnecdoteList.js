import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { actionVote } from '../reducers/anecdoteReducer'
import { actionShowNotification, actionHideNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => (
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={handleVote}>vote</button>
    </div>
  </div>
)

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes > a.votes))

  const vote = (id, content) => {
    dispatch(actionVote(id))
    dispatch(actionShowNotification(`you voted "${content}"`))
    setTimeout(() => dispatch(actionHideNotification()), 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => vote(anecdote.id, anecdote.content)} />
      ))}
    </div>
  )
}

export default AnecdoteList