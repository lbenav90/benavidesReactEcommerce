import './ItemContainer.css'
import { useState } from 'react';
import ItemCard from './ItemCard/ItemCard';
import { useParams } from 'react-router-dom';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import { useCartContext } from '../../context/CartContext';
import { useEffect } from 'react';


const ItemContainer = () => {
    const { products } = useCartContext();
    const { categoryId, subcategoryId } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ display, setDisplay ] = useState([])

    useEffect(() => {   
      products.length != 0 && setLoading(false);
    }, [products])
    
    useEffect(() => {
      let filtered = products
      categoryId && (filtered = filtered.filter((product) => product.category.split(' ').includes(categoryId)))
      subcategoryId && (filtered = filtered.filter((product) => product.category.split(' ').includes(subcategoryId)))

      setDisplay(filtered);
    }, [products, categoryId, subcategoryId])

    return (
      loading? <LoadingAnimation />
      : (
          <div className='item-container'>
              { display.map(product => (
                <ItemCard key={product.id} product={product}/>
              )) }
          </div>
      )
    )
}

export default ItemContainer