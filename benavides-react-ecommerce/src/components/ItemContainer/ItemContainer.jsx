import React from 'react'
import { useState } from 'react'
import './ItemContainer.css'

const ItemContainer = ({ greeting }) => {
  const [ count, setState] = useState(0)

  const add = () => {
    setState(count + 1);
  }

  return (
    <div className='item-container'>
        { /*greeting*/ }
        <p>{count}</p>
        <button onClick={add}> + </button>
    </div>
  )
}

export default ItemContainer