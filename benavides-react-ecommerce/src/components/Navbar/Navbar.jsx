import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget/CartWidget'
import './Navbar.css'
import NavButton from './NavButton/NavButton'

const Navbar = () => {
  return (
    <nav className="top-navbar">
        <Link to='/' className="logo"><span>mondrian</span></Link>
        <div className="button-container">
          <Link to='/category/men'>
            <NavButton category='Men'/>
          </Link>
          <Link to='/category/women'>
            <NavButton category='Women'/>
          </Link>
          <Link to='/category/children'>
            <NavButton category='Children'/>
          </Link>
          <Link to='/category/sports'>
            <NavButton category='Sports'/>
          </Link>
        </div>
        <CartWidget />
    </nav>
  )
}

export default Navbar
