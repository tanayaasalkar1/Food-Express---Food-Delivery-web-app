import React from 'react'
import './Orders.css'
import axios from 'axios';
import {toast} from 'react-toastify'
import { useState, useEffect } from 'react';
import  {assets} from '../../assets/assets'


const Orders = ({url}) => {
  // creating state variable to store data coming from backend api 
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
  try {
    const response = await axios.get(`${url}/api/order/list_orders`);
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error fetching orders");
    }
  } catch (error) {
    toast.error("Failed to fetch orders");
    console.error(error);
  }
};

  const statushandler = async (event, orderId) => {
    // console.log(event, orderId);
    const response = await axios.post(`${url}/api/order/status`,{
      orderId,
      status: event.target.value
    })  //api call
    if (response.data.success) {
     await fetchOrders()
    }

    
  }

  useEffect(()=>{
    fetchOrders()
  },[])

  return (
    <div className='order add'>
      <h3>Orders</h3>
      <div className="order-list">
        {orders.map((order, index)=>(
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index)=>{
                  if (index===order.items.length-1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + " , "
                  }
                })}

              </p>
              <p className='order-item-name'>
                {order.address.firstName + " " + order.address.lastName}

              </p>
              <div className='order-item-address'>
                <p>{order.address.street+", "}</p>
                <p>{order.address.city+", "+ order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>INR : {order.amount}</p>
            <select onChange={(event)=>statushandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div> 
        ))}
      </div>
      
    </div>
  )
}

export default Orders