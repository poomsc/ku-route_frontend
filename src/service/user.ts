import { firebaseApp, firestore } from "config/firebase"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, 
      collection,
      doc, 
      getDoc, 
      setDoc, serverTimestamp, 
      addDoc } from 'firebase/firestore/';

interface registerProps {
  UID:string
  Name:string
  Surname:string
  Email:string
}

interface postProps {
  AccountID:string
  FileID:string[]
  TagID:string[]
  SubjectID:string
  Title:string
  Description:string
}

interface commentProps {
  AccountID:string
  PostID:string
  Description:string
}

async function register({UID, Name, Surname, Email}:registerProps){
  const data =  {
    Name,
    Surname,
    Email,
    DateCreate: serverTimestamp(),
    DateEdited: serverTimestamp(),
    DateLastlogin: serverTimestamp(),
    Status: true,
  }
  try {
      console.log("Account is being added...")
      const docRef = await setDoc(doc(firestore, "Account", UID), data)
      console.log("Account was written") //with ID: ", UID);
      return true
  } catch (e) {
      console.error("Error adding account: ", e)
      return false
  }
}

async function create_post({AccountID, FileID, TagID, SubjectID, Title, Description}:postProps) {
  const data = {
    AccountID,
    FileID,
    TagID,
    SubjectID,
    Title,
    Description,
    DateCreate: serverTimestamp(),
    DateEdited: serverTimestamp(),
    Status: true,
  }
  try{
    console.log("Post is being added...");
    const docRef = await addDoc(collection(firestore, "Post"), data);
    console.log("Post written with ID: ", docRef.id);
    return true
  } catch (e) {
    console.error("Error adding post: ", e);
    return false
  }
}

async function create_comment({AccountID, PostID, Description}:commentProps) {
  const data = {
    AccountID,
    PostID,
    Description,
    DateCreate: serverTimestamp(),
    DateEdited: serverTimestamp(),
    Status: true,
  }
  try{
    console.log("Comment is being added...");
    const docRef = await addDoc(collection(firestore, "Comment"), data);
    console.log("Comment written with ID: ", docRef.id);
    return true
  } catch (e) {
    console.error("Error adding Comment: ", e);
    return false
  }
}

async function like (AccountID:string, PostID:string) {

}

async function edit(props: any, col) {
  const docRef = await setDoc(doc(firestore, col), 
  {
      ...props,
      DateEdited: serverTimestamp()
  }
  )
}

async function disable(props: any, col) {
  const docRef = await setDoc(doc(firestore, col), 
  {
      ...props,
      DateEdited: serverTimestamp(),
      Status: false
  }
  )
}

export {
  register,
  create_post,
  create_comment,
  like,
  edit,
  disable,
}