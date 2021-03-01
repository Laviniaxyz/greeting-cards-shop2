import React, { useContext, useEffect, useState } from 'react' 
import {auth} from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const signout = () => {
    return auth.signOut()
  }

  const resetPass = (email) => {
    return auth.sendPasswordResetEmail(email)
  }

  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    resetPass
  }

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}