import React from 'react'
import './ItemCard.css'
import { Link } from 'react-router-dom'

const ItemCard = ({ id, name, price, photo, stock }) => {
    return (
        <Link to={`/item/${id}`} className='item-card'>
            <div className="item-card-photo">
                <img src={ photo } />
            </div>
            <h4>{ name }</h4>
            <p>$ { price }</p>
            <p>Disponibles: {stock}</p>
        </Link>
    )
}

export default ItemCard