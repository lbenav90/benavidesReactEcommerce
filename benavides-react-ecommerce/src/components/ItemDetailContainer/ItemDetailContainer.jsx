import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ItemDetailContainer.css'
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import ItemCount from '../ItemCount/ItemCount';

const productosAPI = [
    {id: 0, name: 'Remera lisa', category: 'men', price: 1200, photo: 'https://d2r9epyceweg5n.cloudfront.net/stores/424/816/products/918-02502-ne-remera-lisa-cuello-redondo-color-negro1-dce1f4ad76bb3dcfa215124569568067-1024-1024.jpg', stock: 10},
    {id: 1, name: 'Pantalon mujer', category: 'women', price: 1700, photo: 'https://http2.mlstatic.com/D_NQ_NP_667962-MLA50595044317_072022-W.jpg', stock: 5},
    {id: 2, name: 'Musculosa', category: 'men', price: 850, photo: 'https://http2.mlstatic.com/D_NQ_NP_861326-MLA42537296022_072020-O.webp', stock: 15},
    {id: 3, name: 'Zapatos facheros', category: 'men', price: 2500, photo: 'data:image/jpeg;base64,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', stock: 4},
    {id: 4, name: 'Una sola media', category: 'sports', price: 150, photo: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/692/686/products/photoroom_20220110_0036011-7d7d5e541083c6e18816417863985635-1024-1024.jpg', stock: 21},
    {id: 5, name: 'Gorro helicoptero', category: 'children', price: 550, photo: 'data:image/jpeg;base64,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', stock: 13},
]

const ItemDetailContainer = () => {
    const [product, setProduct] = useState({});
    const [loading, setBoolean] = useState(true)
    const { productId } = useParams();

    useEffect(() => {
        setTimeout(() => {
            setProduct(productosAPI[parseInt(productId)])
            setBoolean(false)
        }, 1000)
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
                    <ItemCount type='details' name={product.name} stock={product.stock}/>
                </div>
            </div>
        )
    )
}

export default ItemDetailContainer;