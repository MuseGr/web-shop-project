import { 
    signInwithGooglePopup,
    createUserDocumentFromAuth
 } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInwithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
      <div>
        <h1>Sign in</h1>
        <button onClick={ logGoogleUser }>
            Sign in with google pop up
        </button>
      </div>
    )
}

export default SignIn