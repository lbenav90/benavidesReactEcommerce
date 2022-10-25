import React from 'react'
import CartWidget from './CartWidget/CartWidget'
import './Navbar.css'
import NavButton from './NavButton/NavButton'

const Navbar = () => {
  return (
    <nav className="top-navbar">
        <div className="logo"><span>mondrian</span></div>
        <div className="button-container">
          <NavButton category='Men'/>
          <NavButton category='Women'/>
          <NavButton category='Children'/>
          <NavButton category='Sports'/>
        </div>
        <CartWidget />
    </nav>
  )
}

export default Navbar
