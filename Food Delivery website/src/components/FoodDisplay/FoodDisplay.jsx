import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Most Loved Dishes Nearby</h2>
      <div className='food-display-list'> 
        {food_list.map((item) => (
          <FoodItem 
            key={item._id}          //  Use unique MongoDB _id
            _id={item._id}          //  Pass _id to match FoodItem props
            name={item.name} 
            description={item.description} 
            price={item.price} 
            image={item.image}
          />
        ))}
      </div>
    </div>
  )
}

export default FoodDisplay
