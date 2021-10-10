import { makeAutoObservable } from 'mobx'
import { User } from '@firebase/auth'
import { DocumentData } from '@firebase/firestore'

class applicationStore {
  user: User | null = null
  userDisplayName: string = ''
  subjectID: string = ''
  subjectTH: string = ''
  subjectENG: string = ''
  openModalText: boolean = false
  likePostData: DocumentData | null = null
  DeletePost: string = ''

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

  setOpenModalText(open: boolean) {
    this.openModalText = open as boolean
  }

  setLikePostData(likePost: DocumentData) {
    this.likePostData = likePost as DocumentData
  }

  setDeletePost(PostID: string) {
    this.DeletePost = PostID as string
  }
}

export default new applicationStore()
