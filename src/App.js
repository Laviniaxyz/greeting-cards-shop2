import React, { useState } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Homepage from './pages/homepage/homepage'
import Shop from './pages/shop/shop'
import Contact from './pages/contact/contact'
import Login from './components/login/login'
import SignUp from './components/sign-up/sign-up'
import ResetPass from './components/reset-pass/reset-pass'
import Checkout from './pages/checkout/checkout'
import PageNotFound from './pages/page-not-found/page-not-found'
import './App.css'

import Header from './components/header/header'
import { AuthProvider } from './contexts/AuthContext'


function App() {
  const [showMobileNav, setShowMobileNav] = useState(false)

  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav)
  }

  //TO BE CHANGED, ON CLICK OUTSIDE MOBILE NAV SHOULD CLOSE THE NAV NOT TOGGLE IT
  const closeNavHandler = () => {
    setShowMobileNav(!showMobileNav)
  }

  return (
    <Router>
      <div className="App" onClick={closeNavHandler}>
      <AuthProvider>
        <Header toggleMobileNav={toggleMobileNav} showMobileNav={showMobileNav}/>
          <Switch>
            <Route exact path='/' component={Homepage}/>
            <Route path='/shop' component={Shop}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/reset-password' component={ResetPass}/>
            <Route path='/checkout' component={Checkout}/>
            <Route path='*'>
              <PageNotFound/>
            </Route>
          </Switch>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
