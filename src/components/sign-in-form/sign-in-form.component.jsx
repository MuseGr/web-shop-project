import { useState } from "react"

import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import { 
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils"

const defaultFormFields = {
    email: '',
    password: '',
}

import './sign-in-form.styles.scss'

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const resetFormField = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
      const {user} = await signInWithGooglePopup()
      await createUserDocumentFromAuth(user)
  }

    const handleChage = (event) => {
        const {name, value} = event.target

        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        
        try{
          const res = await signInAuthUserWithEmailAndPassword(email, password)
          console.log(res)
          resetFormField()
        }catch(err){
          switch(err.code){
            case 'auth/wrong-password':
              alert('Password is incorect')
              break
            case 'auth/user-not-found':
              alert('No user with this email adress')
              break
            default:
              console.log(err)
              break
          }
        }
    }

    return(
      <div className="sign-up-container">
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={ handleSubmit }>
          <FormInput label="Email" 
                  type="email" required 
                  onChange={handleChage} 
                  name="email" 
                  value={email}/>

          <FormInput label="Password" 
                type="password" required 
                onChange={handleChage} 
                name="password" 
                value={password}/>

          <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
          </div>
        </form>
      </div>
    )
}

export default SignInForm