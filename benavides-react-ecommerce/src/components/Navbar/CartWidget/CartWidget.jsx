import React from 'react'
import './CartWidget.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

library.add(faCartShopping)

const CartWidget = () => {
  return (
    <Link to='/cart' className='cart-widget'>
      <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
    </Link>
  )
}

export default CartWidget