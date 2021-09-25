import React from 'react'
import ReactDOM from 'react-dom'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { User, UserCredential } from '@firebase/auth'
import { doc, DocumentData } from '@firebase/firestore'
import { firestore } from 'config/firebase'
import { get_info } from 'service/system'

class applicationStore {
  user = {} as User
  userDisplayName = {} as string

  constructor() {
    this.user = null as any
    this.userDisplayName = null as any
    makeAutoObservable(this)
  }

  setUser(user: User | null) {
    this.user = user as User
  }

  setUserDisplayName(Name: string | null) {
    this.userDisplayName = Name as string
  }
}

export default new applicationStore()
