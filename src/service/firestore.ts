import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDoc, doc, setDoc, serverTimestamp, addDoc } from 'firebase/firestore/';

const firebaseConfig = {
    // apiKey: "AIzaSyD_5FCWlDGMwYkic7viABgkT5I4CYQGRYk",
    // authDomain: "ku-route-33f37.firebaseapp.com",
    // databaseURL: "https://ku-route-33f37-default-rtdb.asia-southeast1.firebasedatabase.app",
    // projectId: "ku-route-33f37",
    // storageBucket: "ku-route-33f37.appspot.com",
    // messagingSenderId: "1042258147680",
    // appId: "1:1042258147680:web:6bc0fdbcdf71db40160605",
    // measurementId: "G-7J6H1SMFNQ"
    //apiKey: process.env.REACT_APP_PRIVATE_KEY_ID,
    //authDomain: process.env.REACT_APP_AUTH_URI,
    //projectId: process.env.REACT_APP_PROJECT_ID,
    apiKey: "AIzaSyCxrdPGzqnyF7VXy8v4VS-_hgbrzouhj4A",
    authDomain: "ku-route-76f91.firebaseapp.com",
    projectId: "ku-route-76f91",
    storageBucket: "ku-route-76f91.appspot.com",
    messagingSenderId: "428788791753",
    appId: "1:428788791753:web:73311d62c28be612441018",
    measurementId: "G-S48DZ4MGZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);

interface registerProps {
  UID:string
  Name:string
  Surname:string
  Email:string
}

interface postProps {

}

export async function register({UID, Name, Surname, Email}:registerProps) {
  const res = true
  try{
    console.log("Document is being added...");
    const docRef = await setDoc(doc(db, "Account", UID), {
      Name,
      Surname,
      Email,
      DateCreate: serverTimestamp(),
      DateEdited: serverTimestamp(),
      DateLastlogin: serverTimestamp(),
      Status: true,
  });
    console.log("Document written with ID: ", UID);
  } catch (e) {
    console.error("Error adding document: ", e);
    const res = false;
  }
  return res
}

export async function PUT(props: any, col) {
  const docRef = await setDoc(doc(db, col), 
  {
      ...props,
      DateEdited: serverTimestamp()
  }
  );
}

export async function get_info(accountid) {
  const docRef = doc(db, "Account", accountid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function create_post() {

}





// TEST
//register("DIM", "MOY", "hahaha@ku.th")
//get_info("5lgjsvjPsZGlbiLMfzM2")