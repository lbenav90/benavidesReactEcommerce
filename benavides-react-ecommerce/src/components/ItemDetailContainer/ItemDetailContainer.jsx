import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ItemDetailContainer.css'
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import ItemCount from '../ItemCount/ItemCount';
import { useCartContext } from '../../context/CartContext';

const ItemDetailContainer = () => {
    const { productId } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ product, setProduct ] = useState({})
    const [ stock, setStock ] = useState(0);
    
    const { products, cartList } = useCartContext();

    useEffect(() => {
        const filtered = Object.entries(products).filter((prod) => productId == prod[1].id)

        filtered.length != 0 && setProduct(filtered[0][1])
        filtered.length != 0 && setLoading(false);
    }, [products, loading])

    let currentStock = 0;

    useEffect(() => {
        currentStock = (product.stock || 0) - (cartList.filter((prod) => productId === prod.id)[0]?.count || 0);
        setStock(currentStock)
    }, [product])
    
    
    return (
        loading? <LoadingAnimation />
        : (
            <div className='item-details'>
                <div className="item-information">
                    <h1>{product.name}</h1>
                    <h3>Categoría: {product.category}</h3>
                    <div className="item-details-img">
                        <img src={product.photo}/>
                    </div>
                    <h2>Precio: $ {product.price}</h2>
                </div>
                <div className="item-count">
                    <ItemCount type='details' product={product}/>
                </div>
            </div>
        )
    )
}

export default ItemDetailContainer;