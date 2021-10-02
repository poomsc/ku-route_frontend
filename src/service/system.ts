// Initialize Cloud Firestore through Firebase
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  DocumentData,
} from 'firebase/firestore'
import {
  getStorage,
  ref,
  listAll,
  deleteObject,
  getDownloadURL,
} from 'firebase/storage'
import { firebaseApp, storage } from 'config/firebase'

const db = getFirestore(firebaseApp)

export async function get_faculty() {
  try {
    console.log('get_faculty')
    let faculty = [] as any
    const querySnapshot = await getDocs(collection(db, 'Faculty'))
    querySnapshot.forEach((doc) => {
      faculty.push(doc.data().name)
    })
    return faculty
  } catch (error) {
    console.log('get_faculty', error)
    // alert(error)
    return null
  }
}

export async function get_info(accountid: string) {
  try {
    console.log('get_info')
    const docRef = doc(db, 'Account', accountid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      //console.log('Document data:', docSnap.data())
      return docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      return null
    }
  } catch (error) {
    console.log('get_info', error)
    // alert(error)
    return null
  }
}

export async function get_my_post(AccountID: string) {
  try {
    console.log('get_post')
    const q = query(
      collection(db, 'Account'),
      where('AccountID', '==', AccountID)
    )
    const querySnapshot = await getDocs(q)
    const my_post = [] as any
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      my_post.push([doc.id, doc.data()])
      // console.log(doc.id, ' => ', doc.data())
    })
    console.log(my_post)
    return my_post
  } catch (error) {
    console.log('get_post', error)
    // alert(error)
    return null
  }
}

export async function get_one_post(PostID: string) {
  try {
    console.log('get_one_post')
    const docRef = doc(db, 'Post', PostID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      return docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      return null
    }
  } catch (error) {
    console.log('get_one_post', error)
    // alert(error)
    return null
  }
}

export async function get_comment(PostID: string) {
  try {
    console.log('get_comment')
    const q = query(collection(db, 'Comment'), where('PostID', '==', PostID))
    const querySnapshot = await getDocs(q)
    const all_comment = [] as DocumentData
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data())
      all_comment.push(doc.data())
    })
    return all_comment
  } catch (error) {
    console.log('get_comment', error)
    // alert(error)
  }
}

export async function get_info_comment(comment: DocumentData) {
  try {
    console.log('get_info_comment')
    let infoComment = [] as DocumentData[]
    comment.forEach(async (cm) => {
      const info = (await get_info(cm.AccountID)) as DocumentData
      infoComment.push(info)
    })
    return infoComment
  } catch (error) {
    console.log('get_info_comment', error)
    // alert(error)
  }
}

export async function get_file(PostID: string) {
  try {
    console.log('get_file')
    const listRef = ref(storage, PostID)
    // Find all the prefixes and items.
    const result = await listAll(listRef)
    const all_filename = [] as any
    result.items.forEach((file) => {
      all_filename.push(file.name)
    })
    return all_filename
  } catch (error) {
    console.log('get_file', error)
    // alert(error)
  }
}

export async function get_pathfile(PostID: string) {
  try {
    // Create a reference under which you want to list
    const listRef = ref(storage, PostID)
    // Find all the prefixes and items.
    const result = await listAll(listRef)
    const all_path = [] as any
    // console.log(result)
    result.items.forEach((file) => {
      all_path.push(file.fullPath)
    })
    return all_path
  } catch (error) {
    console.log('get_pathfile', error)
  }
}

export async function delete_post(PostID: string) {
  try {
    await deleteDoc(doc(db, 'Post', PostID))
    console.log('Delete successfully')
  } catch (error) {
    console.log('delete_post', error)
  }
}

export async function delete_file(filepath: string) {
  const storage = getStorage()
  // Create a reference to the file to delete
  const fileRef = ref(storage, filepath)

  try {
    await deleteObject(fileRef)
    console.log('Delete successfully')
  } catch (error) {
    console.log('delete_file', error)
  }
}

export async function delete_comment(CommentID: string) {
  try {
    await deleteDoc(doc(db, 'Comment', CommentID))
    console.log('Delete successfully')
  } catch (error) {
    console.log('delete_comment', error)
  }
}

export async function getDocLike(LikeID: string) {
  try {
    const LikeRef = doc(db, 'Like', LikeID)
    const LikeSnap = await getDoc(LikeRef)
    if (LikeSnap.exists()) {
      // console.log(LikeSnap.data())
      return LikeSnap.data()
    } else {
      console.log('No such document!')
      return null
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getLikeOfPost(PostID: string) {
  try {
    const q = query(
      collection(db, 'Like'),
      where('PostID', '==', PostID),
      where('Status', '==', true)
    )
    const querySnapshot = await getDocs(q)
    // console.log(querySnapshot)
    const all_like = [] as any
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data())
      all_like.push(doc.data())
    })
    // console.log("count of like: " + all_like.length)
    return all_like.length
  } catch (error) {
    console.log(error)
  }
}
