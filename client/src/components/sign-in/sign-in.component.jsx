import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

// import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'

// import './sign-in.styles.scss'

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer
} from './sign-in.styles'



const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [ userCredentials, setCredentials ] = useState({ email: '', password: '' })

  const { email, password } = userCredentials

  const handleSubmit = async event => {
    event.preventDefault()
    emailSignInStart(email, password) // Added for Saga, need to call it here
  }

  const handleChange = event => {
    const { value, name } = event.target
    setCredentials({ ...userCredentials, [name]: value }) // replaced this.setState
  }

   return (
     <SignInContainer>
       <SignInTitle>I already have an account</SignInTitle>
       <span>Sign in with your email and password</span>

       <form onSubmit={handleSubmit}>  
         <FormInput
           name='email'
           type='email'
           handleChange={handleChange}
           value={email}
           label='email'
           required
         />
         <FormInput
           name='password'
           type='password'
           value={password}
           handleChange={handleChange}
           label='password'
           required
         />
         <ButtonsBarContainer>
           <CustomButton type='submit'> Sign in </CustomButton>
           <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
             Sign in with Google
           </CustomButton>
         </ButtonsBarContainer>
       </form>
     </SignInContainer>
   )
 }

/* 
1. googleSignInStart just needs to be executed
2. emailSignInStart needs to send the data object as keys to values */
const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(
  null, 
  mapDispatchToProps)
(SignIn)
