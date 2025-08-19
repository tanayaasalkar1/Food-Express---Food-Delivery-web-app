import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

    

    //To store uploaded image creating state variable
    const [image, setImage] = useState(false);

    //to store name, desc, price, etc creating more state variable
    const [data, setData] = useState({
        name:'',
        description:'',
        price:'',
        category:'Salad'
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:[value]}))
    }

    //API Call
    const onSubmitHandler =async (e) => {
       e.preventDefault();
       const formData = new FormData();
       formData.append("name", data.name);
       formData.append("description", data.description);
       formData.append("price", Number(data.price));
       formData.append("category", data.category);
       formData.append("image", image);

       //use axios to call api
       const response = await axios.post(`${url}/api/food/add`, formData)

       //to check response is success or fail
       if (response.data.success) {
            setData({
            name:'',
            description:'',
            price:'',
            category:'Salad'
           
        })
         setImage(false);
         toast.success(response.data.message)
       } else{
            toast.error(response.data.message)
       }
    }

    //to check our funtion is working or not

    // useEffect (()=> {
    //     console.log(data);
    // }, [data])


  return (
    //creating add page to add new item in mongodb database
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-image flex-col" >
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                {/* by selecting it will select image selection window */}
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>
            <div className="add-product flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name}  type="text" name="name" placeholder='Type Here' id="" />
            </div>
            <div className="add-desc flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write content here' required></textarea>
            </div>
            <div className="add-cat-price">
                <div className="add-cat flex-col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} value={data.category} name="category" >
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$10' />
                </div>
            </div>
            <button type='submit' className='add-btn'>Add</button>
        </form>
        
    </div>
  )
}

export default Add