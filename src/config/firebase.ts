import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_APIKEY,
  // authDomain: process.env.REACT_APP_AUTHDOMAIN,
  // projectId: process.env.REACT_APP_PROJECTID,
  // storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  // appId: process.env.REACT_APP_APPID,
  // measurementId: process.env.REACT_APP_MEASUREMENTID,
  apiKey: 'AIzaSyD_5FCWlDGMwYkic7viABgkT5I4CYQGRYk',
  authDomain: 'ku-route-33f37.firebaseapp.com',
  databaseURL:
    'https://ku-route-33f37-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'ku-route-33f37',
  storageBucket: 'ku-route-33f37.appspot.com',
  messagingSenderId: '1042258147680',
  appId: '1:1042258147680:web:6bc0fdbcdf71db40160605',
  measurementId: 'G-7J6H1SMFNQ',
}
const firebaseApp = initializeApp(firebaseConfig)
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)
const firebaseAuth = getAuth(firebaseApp)

export { firebaseConfig, firebaseApp, firestore, storage, firebaseAuth }
