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

export async function get_post() {
  try {
    const querySnapshot = await getDocs(collection(db, 'Post'))
    const all_post = [] as any
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      all_post.push(doc.data())
      // console.log(doc.id, ' => ', doc.data())
    })
    console.log(all_post)
    return all_post
  } catch (error) {
    console.log('get_post', error)
    // alert(error)
  }
}

export async function get_one_post(PostID: string) {
  try {
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
    const q = query(collection(db, 'Comment'), where('PostID', '==', PostID))
    const querySnapshot = await getDocs(q)
    const all_comment = [] as any
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

export async function get_info_comment(PostID: string) {
  try {
    const comment = await get_comment(PostID)
    const comment_info = [] as any
    comment.forEach(async (cm) => {
      // console.log(i.AccountID)
      const info = await get_info(cm.AccountID)
      comment_info.push(info)
    })
    return comment_info
  } catch (error) {
    console.log('get_info_comment', error)
    // alert(error)
  }
}

export async function get_file(PostID: string) {
  try {
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

// export async function download_file(filepath: string) {
// }
