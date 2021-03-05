import React from 'react'
import { connect } from 'react-redux'

import { actionFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }
  
  return (
    <div style={style}>
      filter: 
      <input 
        name="filter"
        onChange={(event) => props.actionFilter(event.target.value)}
      />
    </div>
  )
}

const connectedFilter = connect(null, { actionFilter })(Filter)

export default connectedFilter