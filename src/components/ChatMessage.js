import React from 'react'

import firebase from 'firebase/app'

const auth = firebase.auth()

const ChatMessage = ({ message }) => {
  const { text, uid } = message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
    </div>
  )
}

export default ChatMessage
