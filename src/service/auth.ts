import { firebaseAuth } from 'config/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { edit, register } from 'service/user'
import applicationStore from 'stores/applicationStore'
import { serverTimestamp } from 'firebase/firestore'
import { get_info } from 'service/system'

interface signupProps {
  Name: string
  Surname: string
  Email: string
  password: string
}

firebaseAuth.languageCode = 'th'

// async function signUp_EmailPassword({
//   Name,
//   Surname,
//   Email,
//   password,
// }: signupProps) {
//   try {
//     console.log('signUp_EmailPassword')
//     const userCrendential = await createUserWithEmailAndPassword(
//       firebaseAuth,
//       Email,
//       password
//     )
//     // Signed up
//     const user = userCrendential.user
//     const UID = user.uid
//     register({ UID, Name, Surname, Email })
//   } catch (error) {
//     console.log('signUp_EmailPassword', error)
//     // alert(error)
//   }
// }

// async function signIn_EmailPassword(email: string, password: string) {
//   try {
//     console.log('signIn_EmailPassword')
//     const userCredential = await signInWithEmailAndPassword(
//       firebaseAuth,
//       email,
//       password
//     )
//     // Signed in
//     const user = userCredential.user
//     if (!user.emailVerified) {
//       console.log('Please verify your email before logging in.')
//       sendEmailVerification(user)
//     } else console.log('Login successfully.')
//     return userCredential
//   } catch (error) {
//     console.log('signIn_EmailPassword', error)
//     // alert(error)
//   }
// }

async function signOut() {
  try {
    console.log('signOut')
    await firebaseAuth.signOut()
    localStorage.removeItem('providerToken')

    applicationStore.setUser(null)
    console.log('successful logout')
    return true
  } catch (error) {
    console.log('signOut', error)
    // alert(error)
    return false
  }
}

async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
  provider.addScope('https://www.googleapis.com/auth/userinfo.email')
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile')
  try {
    console.log('signInWithGoogle')
    const userCredential = await signInWithPopup(firebaseAuth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(userCredential)

    const token = credential?.accessToken
    if (token) localStorage.setItem('providerToken', token)

    const user = userCredential.user
    const olduser = await get_info(user.uid)
    const Name = user.displayName?.split(' ') as Array<string>
    const email = user.email as string
    if (olduser && user.emailVerified) {
      await edit({ DateLastlogin: serverTimestamp() }, user.uid, 'Account')
    } else {
      await register({
        UID: user.uid,
        Name: Name[0],
        Surname: Name[1],
        Email: email,
        PhotoURL: user.photoURL,
      })
    }

    applicationStore.setUser(user)
    return userCredential
  } catch (error) {
    //console.log('signInWithGoogle', error)
    alert(error)
    return false
  }
}

export { signInWithGoogle, signOut }
