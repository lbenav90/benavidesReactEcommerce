import React from 'react'
import './CartWidget.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

library.add(faCartShopping)

const CartWidget = () => {
  return (
    <div className='cart-widget'>
        <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
    </div>
  )
}

export default CartWidget