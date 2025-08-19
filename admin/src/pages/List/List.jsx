import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const List = () => {
  const url = 'http://localhost:4000/';
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error('Failed to fetch list');
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}api/food/remove`, { id: foodId });
      console.log(response.data);
      if (response.data.success) {
        toast.success('Food Removed');
        fetchList(); // Refresh the list
      } else {
        toast.error(response.data.message || 'Error removing food');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server Error');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-container add flex-col">
      <div className="all-list">
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {list.length === 0 ? (
            <p className='empty-text' style={{ textAlign: 'center', marginTop: '20px', textDecoration: 'underline' }}>
              Your list is empty <br /> <span><NavLink to='/add'>click here</NavLink> </span>to add items.
            </p>
          ) : (
            list.map((item, index) => (
              <div key={index} className="list-table-format">
                <img src={`${url}images/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={() => removeFood(item._id)} className="cursor">
                  X
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
