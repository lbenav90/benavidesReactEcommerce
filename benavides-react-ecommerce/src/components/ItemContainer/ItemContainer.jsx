import './ItemContainer.css'
import { useState } from 'react';
import ItemCard from './ItemCard/ItemCard';
import { useParams } from 'react-router-dom';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';


const ItemContainer = () => {
    const { categoryId, subcategoryId } = useParams();
    const [ products, setProducts ] = useState([])
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
      products.length != 0 && setLoading(false)
    }, [products])
    
    useEffect(() => {
      setLoading(true);
      const db = getFirestore();
      const query = collection(db, 'items');
      getDocs(query)
        .then((resp) => { 
          let newProducts = resp.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          categoryId && (newProducts = newProducts.filter((product) => product.category.split(' ').includes(categoryId)))
          subcategoryId && (newProducts = newProducts.filter((product) => product.category.split(' ').includes(subcategoryId)))
          
          setProducts(newProducts) 
        })
    }, [categoryId, subcategoryId])

    return (
      loading? <LoadingAnimation />
      : (
          <div className='item-container'>
              { products.map(product => (
                <ItemCard key={product.id} product={product}/>
              )) }
          </div>
      )
    )
}

export default ItemContainer