import React from 'react'

const Notification = ({message, type}) => {
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