import { firebaseAuth } from 'config/firebase'
import { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    UserCredential,
    signInWithPopup,
    GoogleAuthProvider,
    AuthProvider,
    fetchSignInMethodsForEmail,
    linkWithCredential,
    EmailAuthProvider} from 'firebase/auth'
import { register } from 'service/user';

interface signupProps {
    Name:string
    Surname:string
    Email:string
    password:string
  }

firebaseAuth.languageCode = 'th'

async function signUp_EmailPassword ({Name, Surname, Email, password}:signupProps) {
    createUserWithEmailAndPassword(firebaseAuth, Email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const UID = user.uid
        // ...
        register({UID, Name, Surname, Email})
    })
    .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
        console.log(errorMessage)
    });
}

async function signIn_EmailPassword (email:string, password:string) {
    try {
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password)
        // Signed in 
        const user = userCredential.user;
        if(!user.emailVerified) {
            console.log("Please verify your email before logging in.")
            sendEmailVerification(user)
        }
        else
            console.log("Login successfully.")
        return userCredential
    } catch (error) {
        console.log(error)
    }
}

async function signOut() {
    await firebaseAuth.signOut()
    // localStorage.removeItem('idToken')
    localStorage.removeItem('providerToken')
}

async function signIn_Google() {
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    provider.addScope('https://www.googleapis.com/auth/userinfo.email')
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile')
    try {
        const user_credential = await signInWithPopup(firebaseAuth, provider)
        const email = user_credential.user.email
        const credential = GoogleAuthProvider.credentialFromResult(user_credential)
        const token = credential?.accessToken
        if(token)
            localStorage.setItem('providerToken', token)
        // The signed-in user info.
        const user = user_credential.user
        console.log(user_credential)
        console.log(user)
        console.log(email)
        console.log(token)
        return user_credential
    } catch (e) {
        console.error(e)
    }
}


export {
    signIn_EmailPassword,
    signUp_EmailPassword,
    signIn_Google,
    signOut,
}
