import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ItemCount from '../../../ItemCount/ItemCount';
import './CheckoutTableRow.css'
import { useCartContext } from '../../../../context/CartContext';

library.add(faTrash);

const CheckoutTableRow = ({ item, type, total }) => {
    const { deleteItem, totalCheckout } = useCartContext();

    return ((['item', 'summary'].includes(type) )?
        <div className='checkout-table-row item'>
            {(type === 'item') && <input className='checkout-checkbox' type='checkbox' value={item.id} />}
            <img src={item.photo} />
            <span className='checkout-item-name'>{ item.name }</span>
            <span className='checkout-item-price'>${ item.price.toFixed(2) }</span>
            {(type === 'item') && <ItemCount type='checkout' product={item} />}
            {(type === 'item') && <span onClick={() => deleteItem(item.id)} className='checkout-item-delete'><FontAwesomeIcon icon="fa-solid fa-trash" /></span>}
            {(type === 'summary') && <span className='summary-item-count'>x{ item.count }</span>}
        </div>
        :
        <div className="checkout-table-row total">
            <span className="checkout-total">Total: ${ total? total.toFixed(2) : totalCheckout.toFixed(2) }</span>
        </div>  
    )
}

export default CheckoutTableRow