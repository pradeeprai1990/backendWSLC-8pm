import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { saveLoginDetails } from '../../slice/AdminSlice';

export default function Login() {
    let apiBaseUrl = import.meta.env.VITE_APIBASEPATH;
    let loginData=useSelector((myAllStore)=>{
        return  myAllStore.loginStore.adminDetails
       }) 
       
    let navigator=useNavigate();   
   let dispatch=useDispatch() 
  let checkLogin=(event)=>{

    event.preventDefault()

    let obj={
        adminUname:event.target.adminUname.value,
        adminPassword:event.target.adminPassword.value
    }

    axios.post(`${apiBaseUrl}admin/adminauth/login`,obj)
    .then((res)=>res.data)
    .then((finalres)=>{
        if(finalres.status){
            console.log(finalres.data)
            dispatch(saveLoginDetails({admin:finalres.data}))
        }
        else{
            //Error
            alert(finalres.msg)
        }
    })

  }  

    useEffect(()=>{
       
      if(loginData){
          navigator("/home")
      }
    },[loginData])
  return (
    <section className="bg-gray-50">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          Frank and Oak     
      </a>
      <form onSubmit={checkLogin} className="w-[500px] bg-white rounded-lg shadow-2xl">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Sign in to your account
              </h1>
             
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                      <input type="text" name="adminUname" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                      <input type="password" name="adminPassword" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                  </div>
                  <div className="flex items-center justify-between">
                  </div>
                  
                  <button type="submit" className="w-full text-white  bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                 
              
          </div>
      </form>
  </div>
</section>
  )
}
