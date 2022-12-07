import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget/CartWidget'
import DropdownCategory from './DropdownCategory/DropdownCategory'
import './Navbar.css'
import NavButton from './NavButton/NavButton'

const Navbar = () => {
  const categories = ['Hombre', 'Mujer', 'Niños', 'Deportes' ]
  const subs = {
    'Hombre': ['Remeras', 'Pantalones', 'Zapatillas'],
    'Mujer': ['Remeras', 'Pantalones', 'Zapatillas'],
    'Deportes': ['Remeras', 'Pantalones', 'Zapatillas'],
    'Niños': ['Remeras', 'Pantalones', 'Zapatillas', 'Gorras']
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
