import React, { useState } from 'react'
import './header.scss'
import logo from '../../assets/logo2.jpg'
import shoppingBagIcon from '../../assets/shopping-bag.svg'
import {Link} from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'

const Header = props => {
  const [error, setError] = useState('')
  const {toggleMobileNav, showMobileNav} = props
  const {currentUser, signout} = useAuth()

  const handleSignOut = async() => {
    setError('')
    try {
      await signout()
    } catch {
        setError('Failed to sign out')
    }
  }
  
return(
    <div className='header'>
      <div className='logo'>

        <div className='hamburger-menu'>
          <a onClick={toggleMobileNav}><i className='fa fa-bars fa-2x'></i></a>
          {
            showMobileNav ?
              <div className='mobile-navigation'>
              <div><Link to='/shop'>SHOP</Link></div>
              <div><Link to='/contact'>CONTACT</Link></div>
            </div> 
            :
            null
          }  
        </div>

        <div>
        <Link to='/'><img src={logo} alt='Greeting Card Logo'/></Link>
        </div>
      </div>
      <div className='navigation'>
        <div className="shop-nav"><Link to='/shop'>SHOP</Link></div>
        <div className="contact-nav"><Link to='/contact'>CONTACT</Link></div>
        <div>
          {currentUser?
          <Link to='/login' onClick={handleSignOut}>SIGN OUT</Link>
          : <Link to='/login'>SIGN IN</Link>
          }
          
          </div>
        <div className="bag-nav">
          <div className="item-number">0</div>
         <Link to='checkout'><img className='shopping-bag' src={shoppingBagIcon} alt='shopping-bag-icon'/></Link>
        </div>
      </div>
    </div>
  )
}

export default Header