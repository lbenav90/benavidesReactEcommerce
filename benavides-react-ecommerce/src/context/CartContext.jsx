import { createContext, useState, useContext, useEffect } from "react";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

const CartContext = createContext([]);

export const useCartContext= () => useContext(CartContext);

const CartContextProvider = ({ children }) => {
    const [ cartList, setCartList ] = useState([]);
    const [ products, setProducts ] = useState([]); 
    const [ totalCheckout, setTotalCheckout ] = useState(0)

    useEffect(() => {
        const dbFirestore = getFirestore();
        const queryCollection = collection(dbFirestore, 'items');
        getDocs(queryCollection)
         .then((resp) => { setProducts(resp.docs.map(doc => ({ id:doc.id, ...doc.data() }))) })

    }, [])

    useEffect(() => {
        setTotalCheckout(cartList.reduce((acc, product) => acc + (product.count * product.price), 0))
    }, [cartList])

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
        Swal.fire({
            title: 'Confirmar',
            text: 'Desea borrar el ítem seleccionado?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Volver',
            confirmButtonText: 'Borrar',
            focusConfirm: true
        }).then((result) => {
            if(!result.isConfirmed){
                return false;
            }
            
            setCartList(cartList.filter(item => item.id != itemId));
        
        })
    }

    const deleteAllItems = (type) => {
        (type === 'delete')? 
            Swal.fire({
                title: 'Confirmar',
                text: 'Desea vaciar el carrito?',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Volver',
                confirmButtonText: 'Borrar',
                focusConfirm: true
            }).then((result) => {
                if(!result.isConfirmed){
                    return false;
                }
                
                setCartList([]);
            
            })
        : 
            setCartList([]);        
    }

    const deleteSelectedItems = () => {
        Swal.fire({
            title: 'Confirmar',
            text: 'Desea borrar los ítems seleccionados?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Volver',
            confirmButtonText: 'Borrar',
            focusConfirm: true
        }).then((result) => {
            if(!result.isConfirmed){
                return false;
            }
            
            const selectedInputs = document.querySelectorAll('.checkout-checkbox');
            const selectedIds = [];
    
            selectedInputs.forEach(input => input.checked && selectedIds.push(input.value));
    
            setCartList(cartList.filter(item => !selectedIds.includes(item.id)));

        })

    }

    return (
        <CartContext.Provider value= {{
            products,
            cartList,
            totalCheckout,
            setCartList,
            addItem,
            deleteItem,
            deleteAllItems,
            deleteSelectedItems
        }}>
            { children }
        </CartContext.Provider>
)}

export default CartContextProvider;