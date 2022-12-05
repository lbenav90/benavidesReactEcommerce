import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget/CartWidget'
import DropdownCategory from './DropdownCategory/DropdownCategory'
import './Navbar.css'
import NavButton from './NavButton/NavButton'

const Navbar = () => {
  const categories = ['Men', 'Women', 'Children', 'Sports']
  const subs = {
    'Men': ['Shirts', 'Pants', 'Shoes'],
    'Women': ['Shirts', 'Pants', 'Shoes'],
    'Sports': ['Shirts', 'Pants', 'Shoes'],
    'Children': ['Shirts', 'Pants', 'Shoes', 'Headwear']
  }

  return (
    <nav className="top-navbar">
        <Link to='/' className="logo"><span>mondrian</span></Link>
        <div className="button-container" >
          { categories.map((cat) => {
            return (
              <div className='category-container' key={cat}>
                <Link className='nav-link' to={`/category/${cat.toLowerCase()}`}>
                  <NavButton category={cat} subcategories={true} />
                </Link>
                <DropdownCategory category={cat} subcategories={subs[cat]} />
              </div>
            )
          })}
        </div>
        <CartWidget />
    </nav>
  )
}

export default Navbar
