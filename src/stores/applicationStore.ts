import { makeAutoObservable } from 'mobx'
import { User } from '@firebase/auth'

class applicationStore {
  user: User | null = null
  userDisplayName: string = ''

  constructor() {
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
