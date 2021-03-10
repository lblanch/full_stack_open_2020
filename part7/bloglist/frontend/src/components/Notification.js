import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const { message, type } = useSelector(state => state.notification)
    if (message.length === 0) {
        return null
    }

    return (
        <div className={`notification ${type}`}>
            {message}
        </div>
    )
}

export default Notification