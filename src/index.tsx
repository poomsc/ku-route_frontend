import React from 'react'
import ReactDOM, { render } from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'semantic-ui-css/semantic.min.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'scss/custom.scss'
import { firebaseAuth } from 'config/firebase'
import { onAuthStateChanged } from '@firebase/auth'
import applicationStore from 'stores/applicationStore'
import { serverTimestamp } from 'firebase/firestore'
import { edit } from 'service/user'

// ReactDOM.render(<App />, document.getElementById('root'))

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

onAuthStateChanged(firebaseAuth, (user) => {
  if (user) {
    applicationStore.setUser(user)
    edit({ DateLastlogin: serverTimestamp() }, user.uid, 'Account')
  }
  render(<App />, document.getElementById('root'))
})

reportWebVitals()
