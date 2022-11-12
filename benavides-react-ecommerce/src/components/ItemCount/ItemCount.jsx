import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faMinus, faCartPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faMinus, faCartPlus);

import './ItemCount.css'

const ItemCount = ({ type, name, stock }) => {
    const [count, setCount] = useState(1);

    
    const changeCount = (event) => {
        (type === 'card') && event.preventDefault();

        const buttonClass = event.target.className
        
        switch (buttonClass) {
            case 'plus-item':
                (count < stock) && setCount(count + 1);
                break;
            case 'minus-item':
                (count > 1) && setCount(count - 1)
                break;
        }
    }

    return ((type === 'details')?
        <>
            <h3 className='item-name'>{ name }</h3>
            <div className="item-counter type-details">
                <button onClick={changeCount} className="minus-item"><FontAwesomeIcon icon="fa-solid fa-minus" /></button>
                <span>{ count }</span>
                <button onClick={changeCount} className="plus-item"><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
            </div>
            <p className="stock-alert">Stock disponible: { stock }</p>
            <button className="add-to-cart type-details">Agregar al carrito</button>
        </>
        :
        <div className='count-container'>
            <div className="item-counter type-card">
                <button onClick={changeCount} className="minus-item"><FontAwesomeIcon icon="fa-solid fa-minus" /></button>
                <span>{ count }</span>
                <button onClick={changeCount} className="plus-item"><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
            </div>
            <button onClick={event => event.preventDefault()} className="add-to-cart type-card"><FontAwesomeIcon icon="fa-solid fa-cart-plus" /></button>
        </div>
    )
}

export default ItemCount