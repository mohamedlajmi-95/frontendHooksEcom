import React from 'react'

const Card = ({image, reference, des, prix}) => {
  return (
    <div className='card'>
      {image && <img src={image} alt={reference} />}
      <div className='card-content'>
        <h1 className='card-title'>{reference}</h1>
        <p className='card-description'>{des.substr(0, 20)}</p>
        <h1 className='card-title'>Prix : {prix} TND</h1>
        <button className='card-button'><i class="fa-solid fa-cart-shopping">Add To Card</i></button>
      </div>
    </div>
  )
}

export default Card
