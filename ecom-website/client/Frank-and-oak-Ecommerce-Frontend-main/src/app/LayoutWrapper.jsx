"use client"
import React, { useEffect, useState } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function LayoutWrapper({ children }) {

  let [removeCommons,setRemoveCommons]=useState(true)
  const router=usePathname()
  console.log(router)

  useEffect(()=>{
    if(router === "/checkouts" || router==="/pages/thankyou" || router==="/account/otp-verification" || router==="/account/forget-password"){
      setRemoveCommons(false)
      
    }
    else{
      setRemoveCommons(true)
    }
  },[router])

  return (
    <Provider store={store}>
      {/* <Header/> */}
      { removeCommons && <Header /> }
      {children}
      {removeCommons && <Footer /> }
      {/* <Footer/> */}
    </Provider>
  );
}