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
            <h4>{ product.name }</h4>
            <p>$ { product.price }</p>
            <p>Disponibles: {stock}</p>
            <ItemCount type='card' product={product} stock={stock} setStock={setStock}/>
        </Link>
    )
}

export default ItemCard