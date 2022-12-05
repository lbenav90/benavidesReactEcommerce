import { createContext, useState, useContext, useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

const CartContext = createContext([]);

export const useCartContext= () => useContext(CartContext);

const CartContextProvider = ({ children }) => {
    const [ cartList, setCartList ] = useState([]);
    const [ totalCheckout, setTotalCheckout ] = useState(0);

    useEffect(() => {
        setTotalCheckout(cartList.reduce((acc, product) => acc + (product.count * product.price), 0))
    }, [cartList])

    const addItem = (newCartItem) => {
        const itemIDs = cartList.map((product) => product.id)
        
        if (itemIDs.includes(newCartItem.id)) {
            setCartList(cartList.map((product) => {
                return (product.id === newCartItem.id)? {...product, count: product.count + newCartItem.count } : product
            }))
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
        const selectedIds = [];
        
        const itemCheckboxes = document.querySelectorAll('.checkout-checkbox');
    
        itemCheckboxes.forEach(input => input.checked && selectedIds.push(input.value));
        
        if(selectedIds.length === 0) { 
            return false; 
        }

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
    
            setCartList(cartList.filter(item => !selectedIds.includes(item.id)));

        })

    }

    const numItems = () => {
        return cartList.reduce((acc, el) => acc + el.count, 0)
    }

    return (
        <CartContext.Provider value= {{
            cartList,
            totalCheckout,
            setCartList,
            addItem,
            deleteItem,
            deleteAllItems,
            deleteSelectedItems, 
            numItems
        }}>
            { children }
        </CartContext.Provider>
)}

export default CartContextProvider;