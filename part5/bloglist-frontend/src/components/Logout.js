import React from 'react'

const Logout = ({ handleLogout, name }) => (
    <div>
        {name} is logged in 
        <button type="button" onClick={handleLogout}>logout</button>
    </div>
)

export default Logout