import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ _id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const itemId = String(_id); // Ensure unique string key

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-img' src={url + "/images/" + image} alt={name} />
        
        {!cartItems[itemId] ? (
          <img
            className='add'
            onClick={() => addToCart(itemId)}
            src={assets.add_icon_white}
            alt="add"
          />
        ) : (
          <div className='food-item-counter'>
            <img onClick={() => removeFromCart(itemId)} src={assets.remove_icon_red} alt="remove" />
            <p>{cartItems[itemId] || 0}</p>
            <img onClick={() => addToCart(itemId)} src={assets.add_icon_green} alt="add" />
          </div>
        )}
      </div>

      <div className="food-item-detail">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
