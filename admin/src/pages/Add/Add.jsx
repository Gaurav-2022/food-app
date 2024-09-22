import React, {  useState } from 'react'
import './Add.css'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { useRevalidator } from 'react-router-dom';
import { toast } from 'react-toastify';
function Add({url}) {

 
    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:'',
        description:"",
        price:"",
        category:"Salad",
       
    })
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        setData(data=>({...data,[name]:val}))

    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",data.price);
        formData.append("category",data.category);
        formData.append("image",image);
        const response = await axios.post(`${url}/api/food/add`,formData)
        if(response.data.success){
            setData({
                name:'',
                description:"",
                price:"",
                category:"salad",
            })
            setImage(false);
            toast.success(response.data.message);
        }
        else{
            console.log('failed')
            toast.error(response.data.message);
        }
    }

    
  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                  <img className='fd-img' src={image?URL.createObjectURL(image): assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here'/>
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here'></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name="category" id="">
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="cake">Cake</option>
                        <option value="Pure veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler}  value={data.price} type="Number" name="price" placeholder='$20' />
                </div>
            </div>
            <button type='submit' className='add-btn'>Add Product</button>
        </form>
    </div>
  )
}

export default Add