import CheckoutTableRow from './CheckoutTableRow/CheckoutTableRow'
import { useCartContext } from '../../../context/CartContext';
import './CheckoutTable.css'

const CheckoutTable = ({ type, items }) => {
    const { cartList } = useCartContext();

    return ((items)?
        <>
            {/* Esto se monta sólo despues de finalizar la compra, con el carrito borrado */}
            {items.map((item) => {
                return <CheckoutTableRow type='summary' key={item.id} item={item} />
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