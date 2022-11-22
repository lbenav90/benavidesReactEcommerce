import React from 'react'
import CheckoutTableRow from './CheckoutTableRow/CheckoutTableRow'

const CheckoutTable = ({ list }) => {

    return (
        <>
            {list.map((item) => {
                return <CheckoutTableRow key={item.id} item={item} />
            })}
        </>
    )
}

export default CheckoutTable