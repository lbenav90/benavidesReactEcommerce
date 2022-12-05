import CheckoutTableRow from './CheckoutTableRow/CheckoutTableRow'
import { useCartContext } from '../../../context/CartContext';
import './CheckoutTable.css'

const CheckoutTable = ({ type, items }) => {
    const { cartList, totalCheckout } = useCartContext();

    return ((items)?
        <>
            {items.map((item) => {
                return <CheckoutTableRow type={(type === 'summary')? 'summary' : 'item'} key={item.id} item={item} />
            })}
            <CheckoutTableRow type='total' total={ items.reduce((acc, item) => acc + item.count * item.price, 0) }/>
        </>
        :
        <>
            {cartList.map((item) => {
                return <CheckoutTableRow type={(type === 'summary')? 'summary' : 'item'} key={item.id} item={item} />
            })}
            <CheckoutTableRow type='total' />
        </>
    )
}

export default CheckoutTable