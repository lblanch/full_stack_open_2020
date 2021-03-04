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
  const anecdotes = useSelector(state => {
    if (state.filter.length > 0) {
      const regexFilter = new RegExp(state.filter,"i")
      return state.anecdotes.filter(a => a.content.match(regexFilter)).sort((a, b) => b.votes > a.votes)
    }
    return state.anecdotes.sort((a, b) => b.votes > a.votes)
  })

  const vote = (anecdote) => {
    dispatch(actionVote(anecdote))
    dispatch(actionShowNotification(`you voted "${anecdote.content}"`))
    setTimeout(() => dispatch(actionHideNotification()), 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => vote(anecdote)} />
      ))}
    </div>
  )
}

export default AnecdoteList