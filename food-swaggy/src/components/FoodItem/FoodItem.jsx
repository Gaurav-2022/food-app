import React, { useContext, useState } from 'react'
import './FoodItem.css'
import {assets} from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
function FoodItem({id,name,price,description,image,category}) {

    
    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);
  return (
    <div>
        <div className="food-item">
            <div className="food-item-image-container">
                <img src={url+"/images/"+image} className='food-item-image' alt="" />
                {

                    !cartItems[id] ? <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" /> :
                     <div className="food-item-counter">
                        <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} alt="" onClick={()=>addToCart(id)}/>
                     </div>
                }
            </div>

            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
                <p className="food-item-category">${category}</p>

            </div>
        </div>
    </div>
  )
}

export default FoodItem