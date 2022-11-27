import CheckoutTableRow from './CheckoutTableRow/CheckoutTableRow'
import { useCartContext } from '../../../context/CartContext';

const CheckoutTable = ({ type, items }) => {

    const { cartList } = useCartContext();

    return ((items)?
        <>
            {items.map((item) => {
                return <CheckoutTableRow type={(type === 'summary')? 'summary' : 'item'} key={item.id} item={item} />
            })}
            <CheckoutTableRow type='total' />
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