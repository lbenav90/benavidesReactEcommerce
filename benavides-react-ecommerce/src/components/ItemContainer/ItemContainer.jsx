import './ItemContainer.css'
import { useState } from 'react';
import ItemCard from './ItemCard/ItemCard';
import { useParams } from 'react-router-dom';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import { useCartContext } from '../../context/CartContext';
import { useEffect } from 'react';


const ItemContainer = () => {
    const { products } = useCartContext();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
      products.length != 0 && setLoading(false);
    }, [products, loading])

    let { categoryId } = useParams();

    let cleanedProducts = [];

    cleanedProducts = categoryId? Object.entries(products.filter((product) => product.category === categoryId)) : Object.entries(products)

    return (
      loading? <LoadingAnimation />
      : (
          <div className='item-container'>
              { cleanedProducts.map(product => (
                <ItemCard key={product[0]} product={product[1]}/>
              )) }
          </div>
      )
    )
}

export default ItemContainer