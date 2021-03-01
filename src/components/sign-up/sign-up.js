import React, {useState} from 'react' 
import './sign-up.scss'
import {Formik, Form, useField} from 'formik'
import {TextField, Button} from '@material-ui/core'
import * as Yup from 'yup'
import {useAuth} from '../../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'


// Reusable input primitive component (Formik)
const MyTextInput = ({label, emailError, ...props}) => {
  const [field, meta] = useField(props)
  return(
    <div className='user-box'>  
    <TextField id="standard-basic" label={label} {...field} {...props} />
    {meta.touched && meta.error? (
      <div>{meta.error}</div>
    ): null
  }
  {emailError? <div className='error'>{emailError}</div>: null}
    </div>
  )
}

//functional component that returns our form (Formik)
const SignUp = () => {

  //server errors from Firebase API
  const [emailError, setEmailError] = useState('')
  const {signup, currentUser} = useAuth()
 

  return(
    <div className='sign-up-page'>
    <div className='sign-up'>
    <h3>Sign up with your email and password</h3>
    <Formik
      initialValues= {{
      email: '',
      password: '',
      confirmPassword: ''
    }}

    validationSchema={
      Yup.object({
        email: Yup.string()
          .email('Email is not valid')
          .required('Email is required'),
        password: Yup.string()
          .required('Password is required')
          .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Password must contain at least 8 characters, one uppercase, one number and one special case character'
          ), 
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }) 
    }

    onSubmit= {async (values, {setSubmitting, resetForm}) => {
      try {
        setEmailError('')
        setSubmitting(true)
        //make async call
        alert(JSON.stringify(values, null, 2))
        await signup(values.email, values.password)
        setSubmitting(false)
        resetForm(values)
      } catch(err) {
        switch(err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message)
            break
        }
      }
      
    }}
    >
    
    {formik => (
      <Form>
        <MyTextInput
          name='email'
          label='Email'
          type='email'
          emailError={emailError}
        />
        <MyTextInput
          name='password'
          label='Password'
          type='password'
        />
        <MyTextInput
          name='confirmPassword'
          label='Confirm Password'
          type='password'
        />
        <Button className='button' type='submit' disabled={formik.isSubmitting} variant="contained" color="primary" >
          Sign up
        </Button>
    </Form>
    )}
    
    </Formik>
    </div>
    <p>Already have an account? <Link to='/login'>Log in</Link></p>
    </div>
  ) 
}

export default SignUp 