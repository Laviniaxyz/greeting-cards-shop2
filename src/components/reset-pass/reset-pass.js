import React, {useState} from 'react' 
import './reset-pass.scss'
import {Formik, Form, useField} from 'formik'
import {TextField, Button} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import * as Yup from 'yup'
import {useAuth} from '../../contexts/AuthContext'
import {Link} from 'react-router-dom'


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
    </div>
  )
}


const ResetPass = () => {
 
  //server errors from Firebase API
  const [emailError, setEmailError] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const {resetPass, currentUser} = useAuth()  

  return(
    <div className='sign-in-page'>
    <div className='sign-in'>
    <h3>Enter your email to reset your password</h3>
    {emailSent? <Alert severity='success' variant='outlined'>Check your inbox for instructions</Alert>: null}
    <Formik
      initialValues= {{
      email: ''
    }}

    validationSchema={
      Yup.object({
        email: Yup.string()
          .email('Email is not valid')
          .required('Email is required'),
        }) 
    }

    onSubmit= { async (values, {setSubmitting, resetForm}) => {
      try {
        setEmailSent(false)
        setEmailError('')
        setSubmitting(true)
      //make async call
        alert(JSON.stringify(values, null, 2))
        await resetPass(values.email)
        setSubmitting(false)
        resetForm(values)
        setEmailSent(true)
        
      }
      catch(err) {
        console.log(err, 'err')
        switch(err.code) {
          case 'auth/invalid-email':
          case 'auth/user-not-found': 
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
       <Button 
          className='button'
          type='submit' 
          disabled={formik.isSubmitting} 
          variant="contained" color="primary" 
          >
            Reset pass
        </Button> 
    </Form>
    )}
    </Formik>
    </div>
    <p>Need an account? <Link to='/signup'>Sign up</Link> today</p>
    </div>
  ) 
}

export default ResetPass