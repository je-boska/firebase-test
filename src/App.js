import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ChatMessage from './components/ChatMessage'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className='App'>
      <header className='App-header'></header>
      {user ? <ChatRoom /> : <SignIn />}
    </div>
  )
}

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return <button onClick={signInWithGoogle}>Sign in with Google</button>
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

const ChatRoom = () => {
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, { idField: 'id' })
  console.log(messages)

  return (
    <main>
      {messages &&
        messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    </main>
  )
}

export default App
