import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
function PlaceOrder() {
    const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
    const [data,setData] = useState({
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

    const onChangeHandler = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}))

    }
  const placeOrder = async (e) => {
        e.preventDefault();
        let orderItems = [];
        food_list.map((item)=>{
            if(cartItems[item._id]>0){
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
        let orderData = {
            address:data,
            items:orderItems,
            amount:getTotalCartAmount()+2,
        }
        console.log(orderData)
        let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
        if(response.data.success){
            const {session_url} = response.data;
            window.location.replace(session_url);
        }
        else{
            console.log(response.data)
            alert("error")
        }
  }
  const navigate = useNavigate();

    useEffect(()=>{
        if(!token){
            navigate("/")
        }
        else if(getTotalCartAmount()===0){
            navigate('/cart')
        }
    },[token])
  return (
    <form action="" className="place-order" onSubmit={placeOrder}>
        <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
            <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName}  placeholder='First Name'/>
            <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName}placeholder='Last Name' />
            </div>
     
       
        <input name='email' onChange={onChangeHandler} value={data.email} type="email"  placeholder='Email address' />
        <input name='street' onChange={onChangeHandler} value={data.street}type="text" placeholder='Street' />
        <div className="multi-fields">
            <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
            <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
        </div>
        <div className="multi-fields">
            <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
            <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
        </div>
        <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
        </div>
        <div className="place-order-right">
        <div className="cart-total">
                <h2>Cart Totals</h2>
                <div>
                <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Delivery fee</p>
                        <p>${getTotalCartAmount()===0?0:2}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Total</p>
                        <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
                    </div>
                </div>
                <button type='submit'>Proceed To Payment</button>
            </div>
        </div>
    </form>
  )
}

export default PlaceOrder