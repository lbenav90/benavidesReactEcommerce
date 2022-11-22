import { createContext, useState, useContext, useEffect } from "react";
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const CartContext = createContext([]);

export const useCartContext= () => useContext(CartContext);

const CartContextProvider = ({ children }) => {
    const [ cartList, setCartList ] = useState([]);
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        const dbFirestore = getFirestore();
        const queryCollection = collection(dbFirestore, 'items');
        getDocs(queryCollection)
         .then((resp) => { setProducts(resp.docs.map(doc => ({ id:doc.id, ...doc.data() }))) })

    }, [products])

    const addItem = (newCartItem) => {
        const itemIDs = cartList.map((product) => {return product.id})
        
        if (itemIDs.includes(newCartItem.id)) {
            cartList.forEach((product) => {
                (product.id === newCartItem.id) && (product.count += newCartItem.count)
            })
        } else {
            setCartList([...cartList, newCartItem])
        }

    }

    const deleteItem = (itemId) => {
        setCartList(cartList.filter(item => item.id != itemId));
    }

    const deleteAllItems = () => {
        setCartList([]);
    }

    const deleteSelectedItems = () => {
        const selectedInputs = document.querySelectorAll('.checkout-checkbox');
        const selectedIds = [];

        selectedInputs.forEach(input => input.checked && selectedIds.push(parseInt(input.value)));

        setCartList(cartList.filter(item => !selectedIds.includes(item.id)));
    }

    return (
        <CartContext.Provider value= {{
            products,
            cartList,
            addItem,
            deleteItem,
            deleteAllItems,
            deleteSelectedItems
        }}>
            { children }
        </CartContext.Provider>
)}

export default CartContextProvider;