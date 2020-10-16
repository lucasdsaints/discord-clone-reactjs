import { Avatar } from '@material-ui/core'
import React from 'react'
import './Message.css'

function Message() {
  return (
    <div className="message">
      <Avatar />
      <div className="message__info">
        <h4>
          Lucas Santos
          <span className="message__timestamp">10/12/2020 12:45:02</span>
        </h4>
        <p>
          This is a message
        </p>
      </div>
    </div>
  )
}

export default Message
