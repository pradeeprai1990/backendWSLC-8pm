"use client"
import BreadCrumb from '@/app/common/BreadCrumb'
import Header from '@/app/common/Header'
import { logOut } from '@/app/slice/userSlice'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux'

export default function Account() {
  let [accountSetting,setAccountSetting]=useState(false)
  let [resetPassword,setResetPassword]=useState(false)
 let token =useSelector((store)=>store.userStore.token)
 let apiBaseUrl=process.env.NEXT_PUBLIC_APIURL;
  function changePasswordFunction(event){
    let obj={
      oldPassword:event.target.oldPassword.value,
      newPassword:event.target.newPassword.value,
      
    }
    axios.post(`${apiBaseUrl}web/user/change-password`,obj,
      {
         headers: {Authorization : `Bearer ${token}`},
      }
    )
    .then((res)=>{
      if(res.data.status){
        alert(res.data.mgs)
      }
      else{
        alert(res.data.mgs)
      }
    })
    event.preventDefault()

  }

  let myOrder=()=>{
    axios.get(`${apiBaseUrl}web/order/view-order`,
      {
         headers: {Authorization : `Bearer ${token}`},
      }
    )
    .then((res)=>{
      if(res.data.status){
        console.log(res.data.data)
      }
      
    })
  }

  useEffect(()=>{
    myOrder()
  },[])


  return (
    <>
      <section className="pt-28 px-[30px]">
        <BreadCrumb prop1={"Home"} prop2={"My Account"} prop3={"Account settings"} />
        <div className='grid lg:grid-cols-[20%_auto] grid-cols-1 gap-10'>
          <AccountSideBar/>
          <div>
            <div className={`${resetPassword ? "hidden" : "block"}`}>
            <div className='flex items-baseline gap-3'>
            <h3 className='md:text-[34px] text-[28px] font-medium'>Account settings</h3>
            <button onClick={()=>setAccountSetting(true)} className={`${accountSetting ? "hidden" : "block"}  text-sm font-semibold text-[#89a8a0] underline`}>Edit</button>
            </div>
            <div className="py-10">
              <ul className={`space-y-4 ${accountSetting ? "hidden" : "block"}`}>
                <li className='text-[13px] font-medium text-customGray'>First Name : <span className='text-black'>Roshan</span></li>
                <li className='text-[13px] font-medium text-customGray'>Last Name : <span className='text-black'>Chaurasia</span></li>
                <li className='text-[13px] font-medium text-customGray'>Email Address : <span className='text-black'>roshanchaurasia990@gmail.com</span></li>
                <li className='text-[13px] font-medium text-customGray'>I shop for : <span className='text-black'>All</span></li>
                <li className='text-[13px] font-medium text-customGray'>Preferred Language : <span className='text-black'>English</span></li>
              </ul>
              {/* On click of Edit Button Start */}
              <form className={`${accountSetting ? "block" : "hidden"}`}>
                <div className='lg:w-[28%] w-full space-y-4'>
                <div>
                  <label htmlFor="uFirstname" className='block text-[13px] mb-1 font-medium'>First Name</label>
                  <input className='w-full border-black font-medium' id='uFirstname' name='uFirstname' type="text" value={"Roshan"} />
                </div>
                <div>
                  <label htmlFor="uLastName" className='block text-[13px] mb-1 font-medium'>Last Name</label>
                  <input className='w-full border-black font-medium'  id='uLastName' name='uLastName' type="text" value={"Chaurasia"} />
                </div>
                <div>
                  <label htmlFor="uemail" className='block text-[13px] mb-1 font-medium'>Email</label>
                  <input disabled className='w-full bg-gray-100 border-black font-medium' id='uemail' name='uemail' type="email" value={"roshanchaurasia990@gmail.com"} />
                </div>
                <div>
                  <label className='text-[13px] font-medium' htmlFor="radioBtns">I shop for:</label>
                  <div className='flex gap-4 py-2'>
                    <div>
                    <input type="radio" id='MenBtn' name='radioBtn' className='form-radio checked:bg-black text-black focus:ring-white me-2' />
                    <label className='text-[13px] font-medium' htmlFor="MenBtn">Men</label>
                    </div>
                    <div>
                    <input type="radio" id='WomenBtn' name='radioBtn' className='form-radio checked:bg-black text-black focus:ring-white me-2' />
                    <label className='text-[13px] font-medium' htmlFor="WomenBtn">Women</label>
                    </div>
                    <div>
                    <input type="radio" id='AllBtn' name='radioBtn' className='form-radio checked:bg-black text-black focus:ring-white me-2' />
                    <label className='text-[13px] font-medium' htmlFor="AllBtn">All</label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className='text-[13px] font-medium' htmlFor="radioBtns">Preferred Language:</label>
                  <div className='flex gap-4 py-2'>
                    <div>
                    <input type="radio" id='french' name='langBtn' className='form-radio checked:bg-black text-black focus:ring-white me-2' />
                    <label className='text-[13px] font-medium' htmlFor="french">French</label>
                    </div>
                    <div>
                    <input type="radio" id='english' name='langBtn' className='form-radio checked:bg-black text-black focus:ring-white me-2' />
                    <label className='text-[13px] font-medium' htmlFor="english">Women</label>
                    </div>
                  </div>
                </div>
                </div>
                <div className='space-x-20  lg:w-[50%] w-full flex justify-end'>
                  <button className='text-customGray hover:text-black hover:underline font-semibold text-sm'>Cancel</button>
                  <button type='submit' className='bg-black text-white font-medium py-3 px-16 text-sm hover:shadow-Btn-shadow'>Save</button>
                </div>
              </form>
              {/* On click of Edit Button End */}
            </div>
            </div>
            <div>
            <div className={`${accountSetting ? "hidden" : "block"}`}>
            <div className="flex items-baseline gap-3">
            <h3 className='lg:text-[34px] text-[28px] font-medium'>{resetPassword ? "Account settings" : "Password"}</h3>
            <button onClick={()=>setResetPassword(true)} className={`${resetPassword ? "hidden" : "block"} text-sm font-semibold text-[#89a8a0] underline`}>Edit</button>
            </div>
            <div className='py-10'>
              <ul className='space-y-4'>
                <li className={`${resetPassword ? "hidden" : "block"} text-[13px] font-medium text-customGray`}>Password : <span className='text-black text-[20px]'>   &nbsp;•••••••••</span></li>
              </ul>
              {/* On click of Edit Button Start */}
              <form onSubmit={changePasswordFunction} className={`${resetPassword ? "block" : "hidden"} lg:w-[55%] w-full`}>
                <h4 className='font-medium text-[26px] pb-5'>Change Password</h4>
                <div className='space-y-4'>
                <div className='relative'>
                  <label htmlFor="password" className='block text-[13px] mb-1 font-medium'>Old Password</label>
                  <input className='w-full border-black font-medium'  id='password' name='oldPassword' type="text" />
                  <button className='text-[13px] underline font-medium absolute right-3 top-[50%]'>Show</button>
                </div>
                <div className='relative'>
                  <label htmlFor="confirmpassword" className='block text-[13px] mb-1 font-medium'>New Password</label>
                  <input className='w-full border-black font-medium'  id='confirmpassword' name='newPassword' type="text" />
                  <button className='text-[13px] underline font-medium absolute right-3 top-[50%]'>Show</button>
                </div>
                <div className='space-x-20 flex justify-end'>
                  <button className='text-customGray hover:text-black hover:underline font-semibold text-sm'>Cancel</button>
                  <button type='submit' className='bg-black text-white font-medium py-3 px-16 text-sm hover:shadow-Btn-shadow'>Submit</button>
                </div>
                </div>
              </form>
              {/* On click of Edit Button End */}
            </div>
            </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


export function AccountSideBar() {

  let dispatch=useDispatch();
  return (
    <div className='lg:block hidden h-screen'>
      <div className='bg-[#EBECEE] px-10 py-8'>
        <ul className='space-y-2'>
          <li className='font-medium text-[15px]'>
            <Link href={"/user-dashboard/order"}>Orders & returns</Link>
            </li>
         
          <li className='font-medium text-[15px]'>
          <Link href={"/user-dashboard/account"}>Account settings</Link>
          </li>
          <li className='font-medium text-[15px]'>
          <button onClick={()=>dispatch(logOut())}>Log Out</button>
          </li>
        </ul>
      </div>
      
    </div>
  )
}

