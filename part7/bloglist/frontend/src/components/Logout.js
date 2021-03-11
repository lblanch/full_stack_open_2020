import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { actionLogout } from '../reducers/userReducer'

const Logout = () => {
    const dispatch = useDispatch()
    const name = useSelector(state => state.user.name)

    const handleLogout = () => {
        dispatch(actionLogout())
    }

    return (
        <span>
            {name} is logged in
            <button type="button" onClick={handleLogout}>logout</button>
        </span>
    )
}

export default Logout