import React from 'react'
import './CartWidget.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useCartContext } from '../../../context/CartContext';
import CartQtyBadge from './CartQtyBadge/CartQtyBadge';

library.add(faCartShopping)

const CartWidget = () => {
  const { numItems } = useCartContext();
  
  const number = numItems();

  return (
    <Link to='/cart' className='cart-widget'>
      <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
      { (number != 0) &&  <CartQtyBadge quantity={number} />}
    </Link>
  )
}

export default CartWidget