import React from 'react'

const Filter = ({filter, handleChangeFilter}) => (
    <div>filter shown with <input value={filter} onChange={handleChangeFilter} /></div>
)

export default Filter