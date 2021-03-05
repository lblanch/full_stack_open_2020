import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
      props.notification.length > 0 ?
        <div style={style}>
          {props.notification}
        </div> :
        <div/>
  )
}

const connectedNotification = connect((state) => ({ notification: state.notification }))(Notification)

export default connectedNotification