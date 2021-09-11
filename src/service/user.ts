import { firebaseApp, firestore } from "../config/firebase";
import { initializeApp } from '@firebase/app';
import { getFirestore, 
      collection, getDoc, 
      doc, setDoc, 
      serverTimestamp, addDoc } from 'firebase/firestore/';

interface registerProps {
    UID:string
    Name:string
    Surname:string
    Email:string
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

export async function register({UID, Name, Surname, Email}:registerProps){
  const data =  {
    Name,
    Surname,
    Email,
    DateCreate: serverTimestamp(),
    DateEdited: serverTimestamp(),
    DateLastlogin: serverTimestamp(),
    Status: true,
  }
  try{
      console.log("Account is being added...")
      const docRef = await setDoc(doc(firestore, "Account", UID), data)
      console.log("Account was written") //with ID: ", UID);
    } catch (e) {
      console.error("Error adding account: ", e)
    }
}

export async function edit_info() {

}