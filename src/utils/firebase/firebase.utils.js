import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider 
} from 'firebase/auth'
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    Firestore
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAJRQ4aEuXuRyqYiAj-LCMqzZUQJTI0KXQ",
    authDomain: "crwn-clothing-db-8f364.firebaseapp.com",
    projectId: "crwn-clothing-db-8f364",
    storageBucket: "crwn-clothing-db-8f364.appspot.com",
    messagingSenderId: "806453041139",
    appId: "1:806453041139:web:04ccf1bd1f7a89c135a486"
};

const firebaseApp = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInwithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid) //Kreira referencu na nekog usera
    const userSnapshot = await getDoc(userDocRef) //Proverava da li user postoji

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }catch (error){
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef
}