import React from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'
import CheckoutTable from './CheckoutTable/CheckoutTable'
import { useCartContext } from '../../context/CartContext'

const Cart = () => {
    const { cartList, deleteAllItems, deleteSelectedItems } = useCartContext();

    return (
        <div className='cart'>
            <div className="inner-cart">
                <h1>Checkout</h1>
                <div className="checkout-items">
                    {
                        (cartList.length != 0)? 
                        <CheckoutTable type='cart' />
                        :
                        <h3>No hay ítems agregados!</h3>
                    }
                </div>
                <div className="cart-buttons">
                    <Link to='/' className="cart-button volver">Seguir comprando</Link>
                    <Link onClick={() => deleteSelectedItems()} className="cart-button delete-selected">Borrar seleccionados</Link>
                    <Link onClick={() => deleteAllItems('delete')} className="cart-button delete-all">Vaciar carrito</Link>
                    <Link to='/checkout' className="cart-button checkout">Checkout</Link>
                </div>
            </div>
        </div>
    )
}

export default Cart