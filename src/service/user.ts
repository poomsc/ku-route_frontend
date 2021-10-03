import { firestore } from 'config/firebase'
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
  updateDoc,
} from 'firebase/firestore'
import { IFileWithMeta } from 'react-dropzone-uploader'
import { upload_file } from './file'

interface registerProps {
  UID: string
  Name: string
  Surname: string
  Email: string
}

interface postProps {
  AccountID: string
  TagID: string[]
  SubjectID: string
  Title: string
  Description: string
}

interface commentProps {
  AccountID: string
  PostID: string
  Description: string
}

async function register({ UID, Name, Surname, Email }: registerProps) {
  const data = {
    Name,
    Surname,
    Email,
    Faculty: null,
    About: ' ',
    DisplayName: Name + ' ' + Surname,
    DateCreate: serverTimestamp(),
    DateEdited: serverTimestamp(),
    DateLastlogin: serverTimestamp(),
    Status: true,
  }
  try {
    console.log('Account is being added...')
    const docRef = await setDoc(doc(firestore, 'Account', UID), data)
    console.log('Account was written') //with ID: ", UID);
    return true
  } catch (e) {
    console.error('Error adding account: ', e)
    return false
  }
}

async function create_post(
  { AccountID, TagID, SubjectID, Title, Description }: postProps,
  allFiles: IFileWithMeta[],
  callBack?: () => void
) {
  console.log({ AccountID, TagID, SubjectID, Title, Description })

  const data = {
    AccountID,
    TagID,
    SubjectID,
    Title,
    Description,
    DateCreate: serverTimestamp(),
    DateEdited: serverTimestamp(),
    Status: true,
  }
  try {
    console.log('Post is being added...')
    const docRef = await addDoc(collection(firestore, 'Post'), data)
    await Promise.all(allFiles.map((file) => upload_file(file.file, docRef.id)))
    console.log('Post was written')
    callBack && callBack()
    return docRef.id
  } catch (e) {
    console.error('Error adding post: ', e)
    return null
  }
}

async function create_comment({
  AccountID,
  PostID,
  Description,
}: commentProps) {
  const data = {
    AccountID,
    PostID,
    Description,
    DateCreate: serverTimestamp(),
    DateEdited: serverTimestamp(),
    Status: true,
  }
  try {
    console.log('Comment is being added...')
    const docRef = await addDoc(collection(firestore, 'Comment'), data)
    console.log('Comment was written')
    return true
  } catch (e) {
    console.error('Error adding Comment: ', e)
    return false
  }
}

async function like(AccountID: string, PostID: string) {
  const data = {
    AccountID,
    PostID,
    DateCreate: serverTimestamp(),
    DateEdited: serverTimestamp(),
    Status: true,
  }
  try {
    console.log('Like...')
    const docRef = await setDoc(
      doc(firestore, 'Like', 'Like:' + AccountID + '_' + PostID),
      data
    )
    //console.log('Like was written') // with ID ");
  } catch (e) {
    console.error('Error adding Like: ', e)
  }
}

async function edit(props: any, ID, col) {
  //edit_post, edit_comment, edit_info
  try {
    const docRef = await updateDoc(doc(firestore, col, ID), {
      ...props,
    })
    return 'Successful'
  } catch (error) {
    // alert(error)
  }
}

async function disable(props: any, ID, col) {
  //unlike, disable_post, disable_comment
  try {
    const docRef = await updateDoc(doc(firestore, col, ID), {
      ...props,
      DateEdited: serverTimestamp(),
      Status: false,
    })
  } catch (error) {
    // alert(error)
  }
}

export { register, create_post, create_comment, like, edit, disable }
