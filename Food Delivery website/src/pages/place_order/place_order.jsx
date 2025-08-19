import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './place_order.css'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const Place_order = () => {
  const {getTotalCart, token, food_list, cartItems, url} = useContext(StoreContext)

  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const navigate = useNavigate();

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCart() + 2
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token }
      });

      const resData = response.data;
      console.log(resData);

      if (resData.success) {
        if (!window.Razorpay) {
          alert("Razorpay SDK not loaded");
          return;
        }

        const options = {
          key: resData.key,
          amount: resData.amount,
          currency: resData.currency,
          name: "Food Delivery App",
          description: "Order Payment",
          order_id: resData.razorpayOrderId,
          handler: function (paymentResponse) {
            console.log(paymentResponse);
            navigate("/my_orders");   // ✅ redirect to my_orders page
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone
          },
          theme: {
            color: "#3399cc"
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  useEffect (()=> {
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCart()==0) {
      navigate('/cart')
    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
          <p className="title">
            Delivery Information
          </p>
          <div className="multifields">
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name'/>
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName}  type="text" placeholder='Last name'/>
          </div>
          <input required name='email' onChange={onChangeHandler} value={data.email}  type="email" placeholder='Email address'/>
          <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
          <div className="multifields">
            <input required name='city' onChange={onChangeHandler} value={data.city}  type="text" placeholder='City'/>
            <input required name='state' onChange={onChangeHandler} value={data.state}  type="text" placeholder='State'/>
          </div>
          <div className="multifields">
            <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="number" placeholder='Zip code'/>
            <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
          </div>
          <input required name='phone' onChange={onChangeHandler} value={data.phone}  type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
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
               <p>{getTotalCart()===0?0:getTotalCart()+2}</p>
              </div>
              <button type='submit'  className='pay-btn'>PROCEED TO PAYMENT</button>
            </div>
          </div>
      </div>         
    </form>
  )
}

export default Place_order
