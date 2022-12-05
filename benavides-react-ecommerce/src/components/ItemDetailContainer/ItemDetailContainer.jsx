import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ItemDetailContainer.css'
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import ItemCount from '../ItemCount/ItemCount';
import { useCartContext } from '../../context/CartContext';

const ItemDetailContainer = () => {
    const { productId } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ product, setProduct ] = useState({})

    useEffect(() => {
        product.length != 0 && setLoading(false)
      }, [product])

    useEffect(() => {
        setLoading(true);
        const db = getFirestore();
        const query = doc(db, 'items', productId);
        getDoc(query)
          .then(resp => { 
            setProduct({id: productId, ...resp.data()}) } )
      }, [])
    
    
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