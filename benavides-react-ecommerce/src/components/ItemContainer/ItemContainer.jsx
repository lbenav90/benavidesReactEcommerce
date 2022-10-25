import React from 'react'
import './ItemContainer.css'

const ItemContainer = ({ greeting }) => {
  return (
    <div className='item-container'>
        { greeting }
    </div>
  )
}

export default ItemContainer