import React from 'react'
import ReactDOM from 'react-dom'
import { makeAutoObservable, observable } from 'mobx'
import { observer } from 'mobx-react-lite'
import {
  getAuth,
  onAuthStateChanged,
  User,
  UserCredential,
} from '@firebase/auth'
import { checkAuthState } from 'service/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

class applicationStore {
  user: User | null = null

  setUser(user: User | null) {
    this.user = user as User
  }
}

export default new applicationStore()
