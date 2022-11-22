import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faMinus, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import './ItemCount.css'
import { useCartContext } from '../../context/CartContext';
import { useEffect } from 'react';

library.add(faPlus, faMinus, faCartPlus);

const ItemCount = ({ type, product, setStock}) => {
    const [count, setCount] = useState(1);
    const [added, setAdded] = useState(false);

    const { cartList, addItem } = useCartContext();
    
    useEffect(() => {
        (type === 'checkout') && setCount(product.count)
    }, [])

    const currentStock = product.stock - (cartList.filter((prod) => product.id === prod.id)[0]?.count || 0);

    // TODO Chequear porque al usar el itemCount la priemra vez rerenderiza todas las cards pero las siguientes no
    // Pasa lo mismo si elimino el setStock y uso el currentStock en itemCard, funciona en el primer click y ya no anda en los siguientes

    const changeCount = (event) => {
        (type === 'card') && event.preventDefault();

        const buttonClass = event.target.className

        switch (buttonClass) {
            case 'plus-item':
                if (type === 'checkout') {
                    (count < product.stock) && setCount(count + 1) ;
                    (count < product.stock) && cartList.forEach((prod) => (prod.id === product.id) && (product.count += 1));
                } else {
                    (count < currentStock) && setCount(count + 1);
                }
                break;
            case 'minus-item':
                (count > 1) && setCount(count - 1);
                (type === 'checkout' && (count > 1)) && cartList.forEach((prod) => (prod.id === product.id) && (product.count -= 1));
                break;
        }
    }

    if (currentStock === 0 && type != 'checkout') {
        return <div className='no-stock'>No disponible</div>
    } else if (type === 'details') {
        return (
        <>
            <h3 className='item-name'>{ product.name }</h3>
            <div className="item-counter type-details">
                {(currentStock === 0)?
                    <span>No disponible</span>
                :
                    <>
                        <button onClick={changeCount} className="minus-item"><FontAwesomeIcon icon="fa-solid fa-minus" /></button>
                        <span>{ count }</span>
                        <button onClick={changeCount} className="plus-item"><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
                    </>
                }
            </div>
            <p className="stock-alert">Stock disponible: { currentStock }</p>
            {added?
                <div className="checkoutButtons">
                    <Link to={'/'}><button className='add-to-cart link'>Volver</button></Link>
                    <Link to={'/cart'}><button className='add-to-cart link'>Checkout</button></Link>
                </div>
            :
                <button className="add-to-cart type-details"
                onClick={() => {
                    addItem({...product, count});
                    (currentStock === 0)? setCount(0) : setCount(1);
                    setAdded(true);
                    // Add toastify and refactor
                }}>Agregar al carrito</button>
            }
        </>
        )
    } else if (type == 'card') {
        return (
        <div className='count-container'>
            <div className="item-counter type-card">
                <button onClick={changeCount} className="minus-item"><FontAwesomeIcon icon="fa-solid fa-minus" /></button>
                <span>{ count }</span>
                <button onClick={changeCount} className="plus-item"><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
            </div>
            <button onClick={(event) => {
                event.preventDefault();
                addItem({...product, count});
                (currentStock - count === 0)? setCount(0) : setCount(1);
                setStock(currentStock - count);
                setAdded(true);
                // Add toastify and refactor
            }} className="add-to-cart type-card"><FontAwesomeIcon icon="fa-solid fa-cart-plus" /></button>
        </div>
        )
    } else {
        return (
            <div className="item-counter type-checkout">
                <button onClick={changeCount} className="minus-item"><FontAwesomeIcon icon="fa-solid fa-minus" /></button>
                <span>{ count }</span>
                <button onClick={changeCount} className="plus-item"><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
            </div>
        )
    }
}

export default ItemCount