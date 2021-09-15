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
import { firebaseApp } from 'config/firebase'

const db = getFirestore(firebaseApp)

export async function get_info(accountid: string) {
  const docRef = doc(db, 'Account', accountid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data())
    return docSnap
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!')
  }
}

export async function get_post() {
  const querySnapshot = await getDocs(collection(db, 'Post'))
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data())
  })
  return querySnapshot
}

export async function get_one_post(PostID:string) {
  const docRef = doc(db, 'Post', PostID)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data())
    return docSnap
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!')
  }
}

export async function get_comment(PostID: string) {
  const q = query(collection(db, 'Comment'), where('PostID', '==', PostID))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data())
  })
  return querySnapshot
}

export async function get_file(PostID: string) {
  const storage = getStorage()
  // Create a reference under which you want to list
  const listRef = ref(storage, PostID)
  // Find all the prefixes and items.

  try {
    const result = await listAll(listRef)
    // console.log(result)
    result.items.forEach((file) => {
      console.log(file.name)
    })
    return result
  } catch (error) {
    console.log(error)
  }
}

export async function delete_post(PostID: string) {
  try {
    await deleteDoc(doc(db, 'Post', PostID))
    console.log('Delete successfully')
  } catch (error) {
    console.log(error)
  }
}

export async function get_pathfile(PostID: string) {
  const storage = getStorage()
  // Create a reference under which you want to list
  const listRef = ref(storage, PostID)
  // Find all the prefixes and items.

  try {
    const result = await listAll(listRef)
    // console.log(result)
    result.items.forEach((file) => {
      console.log(file.fullPath)
    })
  } catch (error) {
    console.log(error)
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
    console.log(error)
  }
}

export async function delete_comment(CommentID: string) {
  try {
    await deleteDoc(doc(db, 'Comment', CommentID))
    console.log('Delete successfully')
  } catch (error) {
    console.log(error)
  }
}

// export async function download_file(filepath: string) {
// }
