//import { useEffect } from 'react'
//import { getRedirectResult } from 'firebase/auth'

import { 
    //auth,
    signInWithGooglePopup,
    //signInWithGoogleRedirect,
    createUserDocumentFromAuth
 } from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
    // useEffect(() => { // Kreira usera nakon sto redirekta
    //   const createUserAfterRedirect = async () => {
    //     const response = await getRedirectResult(auth)
    //     if(response){
    //       const userDOcRef = await createUserDocumentFromAuth(response.user)
    //     }
    //   }
      
    //   createUserAfterRedirect()
    // }, [])

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
      <div>
        <h1>Sign in</h1>
        <button onClick={ logGoogleUser }>
            Sign in with google pop up
        </button>
        <SignUpForm />
      </div>
    )
}

export default SignIn