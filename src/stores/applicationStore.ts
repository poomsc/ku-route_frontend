import React from 'react'
import ReactDOM from 'react-dom'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { User, UserCredential } from '@firebase/auth'

class applicationStore {
  user = {} as User
  info = {} as any

  constructor() {
    this.user = null as any
    makeAutoObservable(this)
  }

  setUser(user: User | null) {
    this.user = user as User
  }

  setInfo
}

export default new applicationStore()
