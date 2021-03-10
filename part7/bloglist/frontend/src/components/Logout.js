import React from 'react'
import PropTypes from 'prop-types'

const Logout = ({ handleLogout, name }) => (
    <div>
        {name} is logged in
        <button type="button" onClick={handleLogout}>logout</button>
    </div>
)

Logout.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

export default Logout