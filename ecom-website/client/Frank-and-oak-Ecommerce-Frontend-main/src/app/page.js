"use client"
import React, { useEffect, useState } from "react";
import Banner from "./HomeComponents/Banner";
import FeaturedCategories from "./HomeComponents/FeaturedCategories";
import ThisJustIn from "./HomeComponents/ThisJustIn";
import ProductReview from "./HomeComponents/ProductReview";
import BetterLiving from "./HomeComponents/BetterLiving";
import TextSlider from "./common/TextSlider";
import axios from "axios";


export default function Home() {
  let apiBaseUrl=process.env.NEXT_PUBLIC_APIURL;
  let [category,setCategory]=useState([])
  let [categoryPath,setPategoryPath]=useState('')

  let [product,setProduct]=useState([])
  let [productPath,setProductPath]=useState('')

  let getCategory=()=>{
    axios.get(`${apiBaseUrl}web/home/parent-category`)
    .then((res)=>res.data)
    .then((finalres)=>{
      setCategory(finalres.data)
      setPategoryPath(finalres.staticPath)
    })
  }

  let getProduct=()=>{
    axios.get(`${apiBaseUrl}web/home/product-featured`)
    .then((res)=>res.data)
    .then((finalres)=>{
      setProduct(finalres.data)
      setProductPath(finalres.staticPath)
    })
  }
  
  
  useEffect(()=>{
    getCategory()
    getProduct();
  },[])

  return (
    <>
    {/* <TextSlider/> */}
    <Banner/>
    <FeaturedCategories category={category} categoryPath={categoryPath} />
    <ThisJustIn product={product} productPath={productPath}  />
    <ProductReview/>
    <BetterLiving/>
    </>
  );
}
