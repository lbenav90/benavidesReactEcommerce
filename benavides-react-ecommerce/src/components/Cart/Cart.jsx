import React from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'
import CheckoutTable from './CheckoutTable/CheckoutTable'

const Cart = () => {
    const currentCart = JSON.parse(localStorage.getItem('mondrian-ecommerce-cart')) //array of id

    return (
        <div className='cart'>
            <div className="inner-cart">
                <h1>Checkout</h1>
                <div className="checkout-items">
                    {
                        currentCart? 
                        <CheckoutTable items={ currentCart }/>
                        :
                        <h3>No hay ítems agregados!</h3>
                    }
                </div>
                <div className="cart-buttons">
                    <Link to='/' className="cart-button volver">Seguir comprando</Link>
                    <Link to='/' className="cart-button delete-selected">Borrar seleccionados</Link>
                    <Link to='/' className="cart-button delete-all">Vaciar carrito</Link>
                    <Link to='/' className="cart-button checkout">Checkout</Link>
                </div>
            </div>
        </div>
    )
}

export default Cart