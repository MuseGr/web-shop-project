import { useState } from "react"

import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import { 
    creteAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils"

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

import './sign-up-form.styles.scss'

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const resetFormField = () => {
        setFormFields(defaultFormFields)
    }

    const handleChage = (event) => {
        const {name, value} = event.target

        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()

        if(password != confirmPassword){
            alert("Passwords do not match!")
            return
        }
        
        try{
          const {user} = await creteAuthUserWithEmailAndPassword(email, password)
          const userDocRef = await createUserDocumentFromAuth(user, {displayName})
          
          resetFormField()
        }catch(err){
          if(err.code === 'auth/email-already-in-use'){
            alert('Cannot create user, email already in use!')
          }
          console.log('Create user encountered an error', err)
        }
        

    }

    return(
      <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={ handleSubmit }>
          <FormInput label="Display Name"
                type="text" required 
                onChange={handleChage} 
                name="displayName" 
                value={displayName}/>

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
          
          <FormInput label="Confirm Password" 
                type="password" required 
                onChange={handleChage} 
                name="confirmPassword" 
                value={confirmPassword}/>

          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    )
}

export default SignUpForm