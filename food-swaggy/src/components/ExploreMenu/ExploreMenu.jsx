import React, { useContext, useEffect } from 'react'
import './Explore.css'
import {menu_list} from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
function ExploreMenu({category,setCategory}) {
  const {food_list} = useContext(StoreContext)
  useEffect(()=>{
    console.log(food_list)
  },[])
  return (
    <div className='explore-menu' id="explore-menu">
            <h1>Explore our menu</h1>
            <p className="explore-menu-text">Choose from a diverse menu featuring a delectable array bvcx ewedcsxa trwedds</p>
            <div className="explore-menu-list">
                {menu_list.map((item,index)=>{
                    return (
                        <div key={index} onClick={()=>setCategory(prev=>prev==item.menu_name?"All":item.menu_name)} className="explore-menu-list-item">
                            <img className={category==item.menu_name?'active':""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
    </div>
  )
}

export default ExploreMenu