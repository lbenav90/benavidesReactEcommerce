import { useState } from 'react'
import './ItemCard.css'
import { Link } from 'react-router-dom'
import ItemCount from '../../ItemCount/ItemCount'
import { useCartContext } from '../../../context/CartContext'

const ItemCard = ({ product }) => {
    const { cartList } = useCartContext();
    // Permite actualizar el stock dinámicamente para el usuario, para que no agregue más que el stock disponible
    const currentStock = product.stock - (cartList.filter((prod) => product.id === prod.id)[0]?.count || 0);

    const [ stock, setStock ] = useState(currentStock)
    
    return (
        <Link to={`/item/${product.id}`} className='item-card'>
            <div className="item-card-photo">
                <img src={ product.photo } />
            </div>
            <p className='item-title'>{ product.name }</p>
            <p className='item-price'>$ { product.price }</p>
            <p className='item-stock'>Disponibles: { stock }</p>
            <ItemCount type='card' product={product} setStock={setStock}/>
        </Link>
    )
}

export default ItemCard