import React, { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCart, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cartItem">
        <div className="cartItem-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className='cartItem-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p >{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price*cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross-btn'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-details">
              <p>Subtotal</p>
              <p>{getTotalCart()}</p>
            </div>
            <hr />
            <div className="cart-details">
              <p>Delivery Fee</p>
              <p>{getTotalCart()===0?0:2}</p>
            </div>
              
            <hr />
            <div className="cart-details">
              <p>Total</p>
              <p>${getTotalCart()===0?0:getTotalCart()+2}</p>
            </div>
            <button onClick={()=>navigate('/place_order')} className='total-btn'>PROCEED TO ORDER</button>
          </div>
          <div className='cart-promocode'>
            <div>
              <p>If you have a promo code, enter it here</p>
              <div className="cart-coupon">
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart