import { makeAutoObservable } from 'mobx'
import { User } from '@firebase/auth'

class applicationStore {
  user: User | null = null
  userDisplayName: string = ''
  subjectID: string = ''
  subjectTH: string = ''
  subjectENG: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  setUser(user: User | null) {
    this.user = user as User
  }

  setUserDisplayName(Name: string | null) {
    this.userDisplayName = Name as string
  }

  setSubjectSearch(subjectID: string, subjectTH: string, subjectENG: string) {
    this.subjectID = subjectID as string
    this.subjectTH = subjectTH as string
    this.subjectENG = subjectENG as string
  }
}

export default new applicationStore()
