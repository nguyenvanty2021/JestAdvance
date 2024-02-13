// ItemList.js
import React from 'react'

const ItemList = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <li key={index}>
          <div>{item}</div>
        </li>
      ))}
    </div>
  )
}

export default ItemList
