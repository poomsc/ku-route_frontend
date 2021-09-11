import { firebaseApp, firestore } from "config/firebase"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDoc, doc, setDoc, serverTimestamp, addDoc } from 'firebase/firestore/';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_APIKEY,
//     authDomain: process.env.REACT_APP_AUTHDOMAIN,
//     projectId: process.env.REACT_APP_PROJECTID,
//     storageBucket: process.env.REACT_APP_STORAGEBUCKT,
//     messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//     appId: process.env.REACT_APP_APPID,
//     measurementId: process.env.REACT_APP_MEASUREMENTI
// };

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

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// }

// const firebaseApp = initializeApp(firebaseConfig)
// const firestore = getFirestore(firebaseApp)

export async function PUT(props: any, col) {
  const docRef = await setDoc(doc(firestore, col), 
  {
      ...props,
      DateEdited: serverTimestamp()
  }
  );
}

export async function create_post({AccountID, FileID, TagID, SubjectID, Title, Description}:postProps) {
  let res = true
  try{
    console.log("Post is being added...");
    const docRef = await addDoc(collection(firestore, "Post"), {
      AccountID,
      FileID,
      TagID,
      SubjectID,
      Title,
      Description,
      DateCreate: serverTimestamp(),
      DateEdited: serverTimestamp(),
      Status: true,
  });
    console.log("Post written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding post: ", e);
    res = false;
  }
  return res
}

export async function create_comment({AccountID, PostID, Description}:commentProps) {
  let res = true
  try{
    console.log("Comment is being added...");
    const docRef = await addDoc(collection(firestore, "Comment"), {
      AccountID,
      PostID,
      Description,
      DateCreate: serverTimestamp(),
      DateEdited: serverTimestamp(),
      Status: true,
  });
    console.log("Comment written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding Comment: ", e);
    res = false;
  }
  return res
}

