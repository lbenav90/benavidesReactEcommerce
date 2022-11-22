import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ItemCount from '../../../ItemCount/ItemCount';
import './CheckoutTableRow.css'
import { useCartContext } from '../../../../context/CartContext';

library.add(faTrash);

const CheckoutTableRow = ({ item }) => {
    const { deleteItem } = useCartContext();

    return (
        <div className='checkout-table-row'>
            <input className='checkout-checkbox' type='checkbox' value={item.id} />
            <img src={item.photo} />
            <span className='checkout-item-name'>{ item.name }</span>
            <ItemCount type='checkout' product={item} />
            <span onClick={() => deleteItem(item.id)} className='checkout-item-delete'><FontAwesomeIcon icon="fa-solid fa-trash" /></span>
        </div>
    )
}

export default CheckoutTableRow