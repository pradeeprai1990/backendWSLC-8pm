"use client"

import axios from "axios";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../slice/cartSlice";

export function Card({ data, productPath }) {
  
  let [colorId, setColorId] = useState(data.productColors[0]._id)

  let apiBaseUrl = process.env.NEXT_PUBLIC_APIURL;
  let { productName, productImage, productAnimationImage, productPrice, productSize, productColors } = data
  let [sizequickAdd, setSizeQuickAdd] = useState(false)
  return (
    <div className='cursor-pointer group'>
      <div className=' w-full h-full'>
        <div className=' relative'>
          <span className='bg-black text-white absolute right-2 top-2 z-[9999] text-[8px] sm:text-[10px] font-medium uppercase px-0.5 sm:px-1 py-0.5'>few left</span>
          <img className='h-full w-full object-cover' src={apiBaseUrl + productPath + productImage} alt="Womens Denim" />
          <img className='h-full w-full duration-300 z-[999] absolute top-0 group-hover:block hidden object-cover' src={apiBaseUrl + productPath + productAnimationImage} alt="Womens Denim" />
          <button onMouseEnter={() => setSizeQuickAdd(true)} onMouseLeave={() => setSizeQuickAdd(false)} className={`${sizequickAdd ? "group-hover:hidden z-[999]" : "group-hover:block z-[999999]"} w-[95%] text-center box-border bg-white py-3 text-[14px] font-medium absolute bottom-2 translate-x-[-50%]  left-[50%] hidden`}>Quick Add

          </button>
          {sizequickAdd ? <SizeSelectionButton productSize={productSize} setSizeQuickAdd={setSizeQuickAdd} data={data} colorId={colorId}/> : ""}
        </div>
        <h5 className='sm:text-[14px] text-[12px] flex gap-3 mt-2 font-semibold'>
          {productName}
          <span className=' rounded-full hover:bg-[#EBECEE] h-7 w-7 p-1'>
            <svg className='sm:w-5 sm:h-5 h-3 w-3 ' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.3666 3.84123C16.941 3.4154 16.4356 3.07761 15.8794 2.84714C15.3232 2.61667 14.727 2.49805 14.1249 2.49805C13.5229 2.49805 12.9267 2.61667 12.3705 2.84714C11.8143 3.07761 11.3089 3.4154 10.8833 3.84123L9.99994 4.72457L9.1166 3.84123C8.25686 2.98149 7.0908 2.49849 5.87494 2.49849C4.65907 2.49849 3.49301 2.98149 2.63327 3.84123C1.77353 4.70098 1.29053 5.86704 1.29053 7.0829C1.29053 8.29876 1.77353 9.46482 2.63327 10.3246L3.5166 11.2079L9.99994 17.6912L16.4833 11.2079L17.3666 10.3246C17.7924 9.89894 18.1302 9.39358 18.3607 8.83736C18.5912 8.28115 18.7098 7.68497 18.7098 7.0829C18.7098 6.48083 18.5912 5.88465 18.3607 5.32844C18.1302 4.77222 17.7924 4.26686 17.3666 3.84123Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </span>
        </h5>


        <div className='sm:text-[14px] text-[13px] font-medium mt-1 sm:mt-3'>$89.50</div>
        <span className='group-hover:hidden sm:text-[16px] text-[12px] block'>{productColors.length} color</span>
        <div className='group-hover:flex gap-3 hidden mt-1'>



          {
            productColors.map((color, index) => {
              return (
                <div className='sm:w-5 sm:h-5 h-3 w-3 rounded-full border border-black flex items-center justify-center'>

                  <div onClick={()=>setColorId(color._id)} className="w-[10px] h-[10px] " style={{background:color.colorName}}></div>
                </div>

              )
            })
          }
        </div>
      </div>
    </div>
  )
}


export function QuickAddButton({ productSize }) {



  return (
    
      <ul className="w-full border flex justify-around border-red-700">
        {productSize.map((size, index) =>
          <button onClick={addToCart} className="w-full border border-green-600 py-1 ">
          <li className="py-2 px-6 hover:bg-black hover:text-white">
            {size.sizeName}
          </li>
           </button>

        )}

      </ul>
   
  );
}

function SizeSelectionButton({ setSizeQuickAdd, productSize,data,colorId }) {

  let dispatch=useDispatch()
  let apiBaseUrl=process.env.NEXT_PUBLIC_APIURL;
  let token =useSelector((store)=>store.userStore.token)
  let addToCart=(sizeId)=>{
    if(token==""){
      alert("Please login to add the product to cart")
      return
    }

 


  
    let product =data._id;
    let quantity = 1;
    let obj={
      product,
      sizeId,
      colorId,
      quantity
    }
    axios.post(`${apiBaseUrl}web/cart/add-to-cart`,
      obj,
      {headers:{authorization:`Bearer ${token}`}}
    )
    .then((res)=>{
      if(res.status){
        alert("Product added to cart")
      }
      dispatch(fetchCart())
    })
    .catch((err)=>{
      console.log(err)
    })

  }

  return (
    <ul onMouseEnter={() => setSizeQuickAdd(true)} onMouseLeave={() => setSizeQuickAdd(false)} className="w-[95%] py-1.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1  text-center box-border bg-white text-[14px] font-medium absolute bottom-2 translate-x-[-50%]  z-[9999] left-[50%]">
      {
      productSize.map((size, index) =>
        <li><button onClick={()=>addToCart(size._id)} className="text-sm font-semibold duration-300 text-black hover:text-white bg-white hover:bg-black px-5 py-2  uppercase"> {size.sizeName}</button></li>
      )}
    </ul>
  )
}
