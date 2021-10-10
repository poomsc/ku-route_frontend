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
  orderBy,
} from 'firebase/firestore'
import { ref, listAll, deleteObject, getDownloadURL } from 'firebase/storage'
import { firebaseApp, storage } from 'config/firebase'

const db = getFirestore(firebaseApp)

async function get_faculty() {
  try {
    console.log('get_faculty')
    const querySnapshot = await getDocs(collection(db, 'Faculty'))
    const Facultys = querySnapshot.docs.map(
      (doc) => doc.data().name
    ) as string[]
    return Facultys
  } catch (error) {
    console.log('get_faculty', error)
    // alert(error)
    return null
  }
}

async function get_info(accountid: string) {
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

async function get_mylikepost(AccountID: string) {
  try {
    const q = query(
      collection(db, 'Like'),
      where('AccountID', '==', AccountID),
      where('Status', '==', true),
      orderBy('DateCreate', 'desc')
    )
    const querySnapshot = (await getDocs(q)) as DocumentData
    const Posts = querySnapshot.docs.map((doc) => doc.data().PostID)
    const infoPosts = (await Promise.all(
      Posts.map((ID) => get_one_post(ID))
    )) as DocumentData
    // console.log(infoPosts)
    return infoPosts
  } catch (error) {
    console.log('get_likepost', error)
    return null
  }
}

async function get_my_post(AccountID: string) {
  try {
    console.log('get_my_post')
    const q = query(
      collection(db, 'Post'),
      where('AccountID', '==', AccountID),
      where('Status', '==', true),
      orderBy('DateCreate', 'desc')
    )
    const querySnapshot = await getDocs(q)
    const Posts = querySnapshot.docs.map((doc) => [doc.id, doc.data()])
    return Posts
  } catch (error) {
    console.log('get_post', error)
    // alert(error)
    return null
  }
}

async function get_one_post(PostID: string) {
  try {
    console.log('get_one_post')
    const docRef = doc(db, 'Post', PostID)
    const docSnap = await getDoc(docRef)

    // console.log(docSnap.data()?.Status)
    if (docSnap.exists() && docSnap.data()?.Status) {
      // console.log('Document data:', docSnap.data())
      return [docSnap.id, docSnap.data()]
      // return {id:docSnap.id, data:docSnap.data()}
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

async function get_comment(PostID: string) {
  try {
    console.log('get_comment')
    const q = query(
      collection(db, 'Comment'),
      where('PostID', '==', PostID),
      orderBy('DateEdited', 'desc')
    )
    const querySnapshot = await getDocs(q)
    const Comments = querySnapshot.docs.map((doc) => [doc.id, doc.data()])
    console.log(Comments)
    return Comments
  } catch (error) {
    console.log('get_comment', error)
    // alert(error)
  }
}

async function get_info_comment(comment: DocumentData) {
  try {
    console.log('get_info_comment')
    const infoComments = await Promise.all(
      comment.map((cm) => get_info(cm[1].AccountID))
    )
    return infoComments
  } catch (error) {
    console.log('get_info_comment', error)
    // alert(error)
  }
}

// export async function get_file(PostID: string) {
//   try {
//     console.log('get_file')
//     const listRef = ref(storage, PostID)
//     // Find all the prefixes and items.
//     const result = await listAll(listRef)
//     const allFileName = result.items.map(file => file.name)
//     return allFileName
//   } catch (error) {
//     console.log('get_file', error)
//     // alert(error)
//   }
// }

async function get_file(PostID: string) {
  try {
    // Create a reference under which you want to list
    const listRef = ref(storage, PostID + '/')
    // Find all the prefixes and items.
    const result = await listAll(listRef)
    // console.log(result)
    const allFilePath = result.items.map((file) => file.fullPath)
    return result.items
  } catch (error) {
    console.log('get_file', error)
  }
}

async function delete_post(PostID: string) {
  try {
    await deleteDoc(doc(db, 'Post', PostID))
    console.log('Delete successfully')
  } catch (error) {
    console.log('delete_post', error)
  }
}

async function delete_file(filepath: string) {
  // Create a reference to the file to delete
  const fileRef = ref(storage, filepath)

  try {
    await deleteObject(fileRef)
    console.log('Delete successfully')
  } catch (error) {
    console.log('delete_file', error)
  }
}

async function delete_comment(CommentID: string) {
  try {
    await deleteDoc(doc(db, 'Comment', CommentID))
    console.log('Delete successfully')
  } catch (error) {
    console.log('delete_comment', error)
  }
}

async function getDocLike(LikeID: string) {
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

async function getLikeOfPost(PostID: string) {
  try {
    const q = query(
      collection(db, 'Like'),
      where('PostID', '==', PostID),
      where('Status', '==', true)
    )
    const querySnapshot = await getDocs(q)
    // console.log(querySnapshot)
    const Likes = querySnapshot.docs.map((doc) => doc.data())
    // console.log("count of like: " + all_like.length)
    return Likes.length
  } catch (error) {
    console.log(error)
  }
}

export {
  get_faculty,
  get_info,
  get_my_post,
  get_one_post,
  get_mylikepost,
  get_comment,
  get_info_comment,
  get_file,
  delete_post,
  delete_file,
  delete_comment,
  getDocLike,
  getLikeOfPost,
}
