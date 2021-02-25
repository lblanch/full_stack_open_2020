import React from 'react'

const Notification = ({message, type}) => {
    console.log(message.length)
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