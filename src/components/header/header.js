import React, { useState, useEffect, useRef } from 'react'
import './header.scss'
import logo from '../../assets/logo2.jpg'
import shoppingBagIcon from '../../assets/shopping-bag.svg'
import {Link} from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'

const Header = props => {
  const [error, setError] = useState('')
  const [showMobileNav, setShowMobileNav] = useState(false)
  const {currentUser, signout} = useAuth()

  const hamburgerMenu = useRef()


  const handleSignOut = async() => {
    setError('')
    try {
      await signout()
    } catch {
        setError('Failed to sign out')
    }
  }

 //on click outside Hamburger Menu, close mobile dropdown
  useEffect(()=> {
    window.addEventListener('click', closeMobileNav)

    return () => {
      window.removeEventListener('click', closeMobileNav)
    }
  }, [showMobileNav])
 

  const closeMobileNav = e => {
   
    if (hamburgerMenu.current.contains(e.target)) {
      setShowMobileNav(!showMobileNav)
    } else {
      setShowMobileNav(false)
    }
  }
  
return(
    <div className='header'>
      <div className='logo'>

        <div className='hamburger-menu' ref={hamburgerMenu} >
          <a><i className='fa fa-bars fa-2x'></i></a>
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

        <div className='logoAndName'>
        <Link to='/'><img src={logo} alt='Greeting Card Logo'/></Link>
        <div>eCards</div>
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