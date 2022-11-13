import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faMinus, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import './ItemCount.css'
import { useCartContext } from '../../context/CartContext';

library.add(faPlus, faMinus, faCartPlus);


const ItemCount = ({ type, product, stock, setStock }) => {
    const [count, setCount] = useState(1);
    const [added, setAdded] = useState(false);

    const { cartList, addItem } = useCartContext();
    
    const currentStock = product.stock - (cartList.filter((prod) => product.id === prod.id)[0]?.count || 0);

    const changeCount = (event) => {
        (type === 'card') && event.preventDefault();

        const buttonClass = event.target.className
        
        switch (buttonClass) {
            case 'plus-item':
                (count < (currentStock)) && setCount(count + 1);
                break;
            case 'minus-item':
                (count > 1) && setCount(count - 1)
                break;
        }
    }

    if (currentStock === 0) {
        return <div className='no-stock'>No disponible</div>
    } else if (type === 'details') {
        return (
        <>
            <h3 className='item-name'>{ product.name }</h3>
            <div className="item-counter type-details">
                {(stock === 0)?
                    <span>No disponible</span>
                :
                    <>
                        <button onClick={changeCount} className="minus-item"><FontAwesomeIcon icon="fa-solid fa-minus" /></button>
                        <span>{ count }</span>
                        <button onClick={changeCount} className="plus-item"><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
                    </>
                }
            </div>
            <p className="stock-alert">Stock disponible: { stock }</p>
            {added?
                <div className="checkoutButtons">
                    <Link to={'/'}><button className='add-to-cart link'>Volver</button></Link>
                    <Link to={'/cart'}><button className='add-to-cart link'>Checkout</button></Link>
                </div>
            :
                <button className="add-to-cart type-details"
                onClick={() => {
                    addItem({...product, count});
                    setStock(stock - count);
                    (stock === 0)? setCount(0) : setCount(1);
                    setAdded(true);
                    // Add toastify and refactor
                }}>Agregar al carrito</button>
            }
        </>
        )
    } else {
        return (
        <div className='count-container'>
            <div className="item-counter type-card">
                <button onClick={changeCount} className="minus-item"><FontAwesomeIcon icon="fa-solid fa-minus" /></button>
                <span>{ count }</span>
                <button onClick={changeCount} className="plus-item"><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
            </div>
            <button onClick={(event) => {
                event.preventDefault();
                addItem({...product, count})
                setStock(stock - count);
                (stock - count === 0)? setCount(0) : setCount(1);
                setAdded(true);
                // Add toastify and refactor
            }} className="add-to-cart type-card"><FontAwesomeIcon icon="fa-solid fa-cart-plus" /></button>
        </div>
        )
    }
}

export default ItemCount