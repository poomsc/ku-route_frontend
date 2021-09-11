import { firebaseAuth } from 'config/firebase'
import { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    UserCredential,
    signInWithPopup,
    GoogleAuthProvider,
    AuthProvider} from 'firebase/auth'
import { register } from 'service/user';

interface signupProps {
    Name:string
    Surname:string
    Email:string
    password:string
  }

firebaseAuth.languageCode = 'th'

async function providersignIn (provider):
Promise<UserCredential> {
    const user_credential = await signInWithPopup(firebaseAuth, provider)
    const credential = provider.credentialFromResult
    if(credential?.accessToken)
        localStorage.setItem('providerToken', credential?.accessToken)
    console.log(user_credential)
    return user_credential
}

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

async function signIn_EmailPassword (email:string, password:string): Promise<void> {
    await signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        if(!user.emailVerified) {
            console.log("Please verify your email before logging in.")
            sendEmailVerification(user)
        }
        else
            console.log("Login successfully.")
        return userCredential
    })
    .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage)
    });

}

async function signOut(): Promise<void> {
    await firebaseAuth.signOut()
    localStorage.removeItem('idToken')
    localStorage.removeItem('providerToken')
}

async function signIn_Google() {
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    provider.addScope('https://www.googleapis.com/auth/userinfo.email')
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile')
    const user_credential = signInWithPopup(firebaseAuth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        if(credential?.accessToken)
            localStorage.setItem('providerToken', credential?.accessToken)
        // The signed-in user info.
        const user = result.user
        // console.log(credential)
        return user_credential
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
        return user_credential
    });
}

export {
    signIn_EmailPassword,
    signUp_EmailPassword,
    signIn_Google,
    signOut,
}
