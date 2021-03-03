import React from 'react'
import { useDispatch } from 'react-redux'

import { actionFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  
  const style = {
    marginBottom: 10
  }
  
  return (
    <div style={style}>
      filter: 
      <input 
        name="filter"
        onChange={(event) => dispatch(actionFilter(event.target.value))}
      />
    </div>
  )
}

export default Filter