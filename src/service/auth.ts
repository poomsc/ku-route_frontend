import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { register } from "./firestore"

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

interface signupProps {
    Name:string
    Surname:string
    Email:string
    password:string
  }

export function signup_EM ({Name, Surname, Email, password}:signupProps) {
const auth = getAuth();
    createUserWithEmailAndPassword(auth, Email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const UID = user.uid
        // ...
        register({UID, Name, Surname, Email})
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage)
    });
}

export function signin_EM (Email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, Email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log("Log in successfull")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
    });
}
