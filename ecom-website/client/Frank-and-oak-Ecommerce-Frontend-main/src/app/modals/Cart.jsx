"use client"
import { BsArrowLeft } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { fetchCart } from "../slice/cartSlice";
import { useEffect, useState } from "react";
export default function Cart({cartStatus,setCartStatus}) {

  
let cartData=useSelector((store)=>store.cartStore.cartItems.data)

let imagePath=useSelector((store)=>store.cartStore.cartItems.staticPath)
console.log(imagePath)


  return (
    <>
    <section className={`${cartStatus ? "opacity-100 visible" : "opacity-0 invisible"} duration-500`}>
    <div className="bg-[rgba(0,0,0,0.6)] fixed top-0 z-[9999999] w-full min-h-screen">
      <div className='lg:w-[38%] w-full  fixed top-0 right-0 z-[999999] bg-white'>
        <div onClick={()=>setCartStatus(!cartStatus)} className='py-3 px-6 flex items-center gap-2 bg-[#F9F9F9] cursor-pointer'>
          <BsArrowLeft className='font-bold' />
          <div className='text-sm font-semibold'>Contine Shopping</div>
        </div>
        <div className=' bg-black text-white text-[12px] text-center font-bold py-1.5'>Free shipping on orders $99+ and free returns</div>
        <div className='md:px-8 px-4 lg:h-screen h-full overflow-y-scroll'>
          {
          cartData && cartData.map((cartItems,index)=>
          <CartProducts key={index} cartItems={cartItems} imagePath={imagePath} />
          )
          }
          
          
        </div>
        <div className="sticky bottom-0 px-8 bg-[#f9f9f9] py-4">
          <div className="flex items-center justify-between">
          <div className="text-[18px] font-semibold">Subtotal <span className="text-[14px] font-semibold text-customGray">(7 items)</span></div>
          <div className="text-[18px] font-semibold">$336.50</div>
          </div>
          <Link href="/checkouts">
          <button className="text-[20px] hover:shadow-[5px_5px_0px_0px_#DDD] font-semibold flex justify-center items-center gap-2 text-white bg-black p-3 w-full mt-5">Secure Checkout <IoLockClosedOutline size={20} /></button>
          </Link>
        </div>
        <div>
        </div>
      </div>
      </div>
      </section>
      </>
  )
}

function CartProducts({cartItems,imagePath}) {
  const token = Cookies.get("token");
  let [qty,setQty]=useState(cartItems.quantity)

  console.log(cartItems)
  let apiBaseUrl=process.env.NEXT_PUBLIC_APIURL;
  let {product}=cartItems
  let {sizeId}=cartItems
  let {colorId}=cartItems
 let dispatch=useDispatch()
  let deleteCart=()=>{
    // Get token from cookies
    let id=cartItems._id
    if(confirm("Are you sure you want to delete this item from cart?")){
      axios.delete(`${apiBaseUrl}web/cart/delete-cart/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then((res)=>{
        console.log(res.data)
        dispatch(fetchCart())
      }
      ).catch((err)=>{
        console.log(err)
      })
    }
    
    
  }


  let changeQuantity=()=>{
    let id=cartItems._id
    axios.put(`${apiBaseUrl}web/cart/change-qty/${id}`,{
     qty
    },{ 
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
      console.log(res.data)
      dispatch(fetchCart())
    }
    ).catch((err)=>{
      console.log(err)
    })
  }


  useEffect(()=>{
    changeQuantity()
  }
  ,[qty])

  
  return (
    <div className='grid grid-cols-[25%_auto] gap-3 py-5 border-b border-customBorder'>
            <img className='w-full' src={apiBaseUrl+imagePath+product.productImage} alt="" />
            <div className='flex flex-col justify-between'>
              <div>
                <div className='flex items-center justify-between'>
                <h5 className='text-sm font-semibold'>
                  {product.productName}
                </h5>
                <MdClose size={20} onClick={deleteCart} />
                </div>
                <div className='font-semibold text-[12px] text-customGray'>Size: {sizeId.sizeName} </div>
                <div className='font-semibold text-[12px] text-customGray'>Color: {colorId.colorName} </div>
                
              </div>
              <div className='flex items-center justify-between'>
                <div className=''>
                  <button onClick={()=>setQty(qty>1 ? qty-1 : qty )} className='px-2.5 py-0.5 text--[20px] border border-customBorder'>-</button>
                  <button className='px-2.5 py-0.5 border border-customBorder'>
                    {qty}
                  </button>
                  <button onClick={()=>setQty(qty<10 ? qty+1 : qty )} className='px-2.5 py-0.5 text--[20px] border border-customBorder'>+</button>
                </div>
                <div className='text-[15px] font-semibold'>Rs {product.productMRP} </div>
              </div>
            </div>
          </div>
  )
}
