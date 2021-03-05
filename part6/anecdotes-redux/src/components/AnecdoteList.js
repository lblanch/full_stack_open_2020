import React from 'react'
import { connect } from 'react-redux'

import { actionVote } from '../reducers/anecdoteReducer'
import { actionSetNotification } from '../reducers/notificationReducer'

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

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.actionVote(anecdote)
    props.actionSetNotification(`you voted "${anecdote.content}"`, 5)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => vote(anecdote)} />
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.filter.length > 0) {
    const regexFilter = new RegExp(state.filter,"i")
    return { anecdotes: state.anecdotes.filter(a => a.content.match(regexFilter)).sort((a, b) => b.votes > a.votes) }
  }
  return { anecdotes: state.anecdotes.sort((a, b) => b.votes > a.votes) }
}

const mapDispatchToProps = { actionVote, actionSetNotification }

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default connectedAnecdoteList