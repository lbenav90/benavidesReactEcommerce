import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faMinus, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import './ItemCount.css'
import { useCartContext } from '../../context/CartContext';
import { useEffect } from 'react';

library.add(faPlus, faMinus, faCartPlus);

const ItemCount = ({ type, product, setStock }) => {
    const [count, setCount] = useState(1);
    const [added, setAdded] = useState(false);

    const { cartList, addItem, setCartList } = useCartContext();
    
    useEffect(() => {
        (type === 'checkout') && setCount(product.count)
    }, [])

    // Esto permite mantener la coherencia de stock según vaya agregando en cualquier componente donde se use el ItemCount
    const currentStock = product.stock - (cartList.filter((prod) => product.id === prod.id)[0]?.count || 0);

    const changeCount = (event) => {
        (type === 'card') && event.preventDefault();

        const buttonClass = event.target.className;

        switch (buttonClass) {
            case 'plus-item':
                if (type === 'checkout') {
                    if (count < product.stock) {
                        setCount(count + 1);
                        setCartList(cartList.map((prod) => {
                            return (prod.id === product.id)? {...prod, count: prod.count + 1} : prod; 
                        }))
                    }
                } else {
                    (count < currentStock) && setCount(count + 1);
                }
                break;
            case 'minus-item':
                (count > 1) && setCount(count - 1);
                if (type === 'checkout' && (count > 1)) {
                    setCartList(cartList.map((prod) => {
                        return (prod.id === product.id)? {...prod, count: prod.count - 1} : prod; 
                    }))
                }
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