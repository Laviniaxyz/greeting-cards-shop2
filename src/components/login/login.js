import React, {useState} from 'react' 
import './login.scss'
import {Formik, Form, useField} from 'formik'
import {TextField, Button} from '@material-ui/core'
import * as Yup from 'yup'
import {useAuth} from '../../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'


// Reusable input primitive component
const MyTextInput = ({label, emailError, passwordError, ...props}) => {
  const [field, meta] = useField(props)
  
  return(
    <div className='user-box'>
    <TextField id="standard-basic" label={label} {...field} {...props} />
    {meta.touched && meta.error? (
      <div className='error'>{meta.error}</div>
    ): null
  }
  {emailError? <div className='error'>{emailError}</div>: null}
  {passwordError? <div className='error'>{passwordError}</div>: null}
    </div>
  )
}


const Login = () => {
 
  //server errors from Firebase API
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const {signin, currentUser} = useAuth()  

  return(
    <div className='sign-in-page'>
    <div className='sign-in'>
    <h3>Log in with your email and password</h3>
    <Formik
      initialValues= {{
      email: '',
      password: '',
    }}

    validationSchema={
      Yup.object({
        email: Yup.string()
          .email('Email is not valid')
          .required('Email is required'),
        password: Yup.string()
          .required('Password is required')
        }) 
    }

    onSubmit= { async (values, {setSubmitting, resetForm}) => {
      try {
        setEmailError('')
        setPasswordError('')
        setSubmitting(true)
      //make async call
        alert(JSON.stringify(values, null, 2))
        await signin(values.email, values.password)
        setSubmitting(false)
        resetForm(values)
      }
      catch(err) {
        console.log(err, 'err')
        switch(err.code) {
          case 'auth/invalid-email':
          case 'auth/user-not-found': 
            setEmailError(err.message)
            break
          case 'auth/wrong-password':
          case 'auth/too-many-requests':
            setPasswordError(err.message)

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
          passwordError={passwordError}
        />
       <Button 
          className='button'
          type='submit' 
          disabled={formik.isSubmitting} 
          variant="contained" color="primary" 
          >
            Log in
        </Button> 
        <div className='reset-pass'><Link to='/reset-password'>Forgot password?</Link></div>
    </Form>
    )}
    </Formik>
    </div>
    <p>Need an account? <Link to='/signup'>Sign up</Link> today</p>
    </div>
  ) 
}

export default Login