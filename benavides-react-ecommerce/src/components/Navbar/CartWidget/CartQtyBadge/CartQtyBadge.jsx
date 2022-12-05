import './CartQtyBadge.css'

const CartQtyBadge = ({ quantity }) => {
    return (
        <div className='cart-quantity'>{quantity}</div>
    )
}

export default CartQtyBadge