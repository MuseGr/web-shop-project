import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
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
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid) //Kreira referencu na nekog usera
    const userSnapshot = await getDoc(userDocRef) //Proverava da li user postoji

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }catch (error){
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef
}

export const creteAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}