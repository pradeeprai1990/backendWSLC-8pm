import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import axios from 'axios';

export default function ProductDetails() {

  let [color,setColor]=useState([])
  let [size,setSize]=useState([])
  let [parentCat,setParentCat]=useState([])

  let [subcat,setSubCat]=useState([])
  let apiBaseUrl = import.meta.env.VITE_APIBASEPATH;
  let getColor=()=>{
    axios.get(`${apiBaseUrl}admin/product/color/`)
    .then((res)=>res.data)
    .then((finalres)=>{
      setColor(finalres.data)
    })
  }

  let getSize=()=>{
    axios.get(`${apiBaseUrl}admin/product/size/`)
    .then((res)=>res.data)
    .then((finalres)=>{
      setSize(finalres.data)
    })
  }

  let getParent=()=>{
    axios.get(`${apiBaseUrl}admin/product/parent-category/`)
    .then((res)=>res.data)
    .then((finalres)=>{
      setParentCat(finalres.data)
    })
  }


 let getSubCategory=(pid)=>{
    axios.get(`${apiBaseUrl}admin/product/subcategory/${pid}`)
    .then((res)=>res.data)
    .then((finalres)=>{
      setSubCat(finalres.data)
    })
  }

  let saveProduct=(event)=>{
    event.preventDefault()

    let formValue = new FormData(event.target)
    axios.post(`${apiBaseUrl}admin/product/add/`,formValue)
    .then((res)=>{
      console.log(res.data)
    })

  }
  useEffect(()=>{
    getSize()
    getColor()
    getParent();
  },[])
  return (
    <section className="w-full">

        <Breadcrumb
          path={"Product"}
          path2={"Product Details"}
          slash={"/"}
        />
        <div className="w-full min-h-[610px]">
          <div className="max-w-[1220px] mx-auto py-5">
            <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
              Product Details
            </h3>
            <form onSubmit={saveProduct} className="border border-t-0 p-3 rounded-b-md border-slate-400">
              <div className="mb-5">
                <label
                  for="base-input"
                  className="block mb-5 text-md font-medium text-gray-900"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name='productName'
                  id="base-input"
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                  placeholder="Product Name"
                />
              </div>
              <div className="mb-5">
                <label
                  for="base-input"
                  className="block mb-5 text-md font-medium text-gray-900"
                >
                  Product Description
                </label>
                <textarea name='productDescription' id="message" rows="3" className=" resize-none block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Add Product Description....."></textarea>
              </div>
              <div className="mb-5">
                <label
                  for="base-input"
                  className="block mb-5 text-md font-medium text-gray-900"
                >
                  Short Description
                </label>
                <textarea name='productShortDescription' id="message" rows="3" className=" resize-none block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Add Product Short Description....."></textarea>
              </div>
              <div className="mb-5">
                <label
                  for="base-input"
                  className="block mb-5 text-md font-medium text-gray-900"
                >
                  Product Image
                </label>
              
                  <label for="file-input" className="sr-only">
                    Choose file
                  </label>
                  <input
                    type="file"
                    name="productImage"
                    id="file-input"
                    className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  
  file:bg-gray-50 file:border-0
  file:me-4
  file:py-3 file:px-4
  "
                  />
                
              </div>
              <div className="mb-5">
                <label
                  for="base-input"
                  className="block mb-5 text-md font-medium text-gray-900"
                >
                Image Animation
                </label>
               
                  <label for="file-input" className="sr-only">
                    Choose file
                  </label>
                  <input
                    type="file"
                    name="productAnimationImage"
                    id="file-input"
                    className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  
  file:bg-gray-50 file:border-0
  file:me-4
  file:py-3 file:px-4
  "
                  />
                
              </div>
              <div className="mb-5">
                <label
                  for="base-input"
                  className="block mb-5 text-md font-medium text-gray-900"
                >
                  Product Gallery
                </label>
               
                  <label for="file-input" className="sr-only">
                    Choose file
                  </label>
                  <input
                    type="file"
                    name="productGallery"
                    id="file-input"
                    className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  
  file:bg-gray-50 file:border-0
  file:me-4
  file:py-3 file:px-4
  " multiple
                  />
              
              </div>
             
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
          <label className="block mb-5 text-md font-medium text-gray-900">Price</label>
          <input
                  type="text"
                  name='productPrice'
                  id="base-input"
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                  placeholder="Product Price"
                />
          </div>
          <div>
          <label className="block mb-5 text-md font-medium text-gray-900">MRP</label>
          <input
                  type="text"
                  name='productMRP'
                  id="base-input"
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                  placeholder="Product MRP"
                />
          </div>
          </div>
           
            <div className="mb-5">
                  <label
                    for="base-input"
                    className="block mb-5 text-md font-medium text-gray-900"
                  >
                    Select Parent Category
                  </label>

                  <select
                    id="default"
                    name='parentCategory'
                    onChange={(event)=>getSubCategory(event.target.value)}
                    className=" border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option selected>--Select Parent Category--</option>
                    {
                      parentCat.map((items,index)=><option value={items._id}> {items.catName} </option>)
                    }
                    
                  </select>
                </div>
            <div className="mb-5">
                  <label
                    for="base-input"
                    className="block mb-5 text-md font-medium text-gray-900"
                  >
                    Select Sub Category
                  </label>

                  <select
                    id="default"
                    name='subCategory'
                    className=" border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option selected>--Select Sub Category--</option>
                    {
                      subcat.map((items,index)=><option value={items._id}> {items.subcategoryName} </option>)
                    }
                  </select>
                </div>
               
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
          <label className="block mb-5 text-md font-medium text-gray-900">Size</label>
          <select
                    id="default"
                    name='productSize[]'
                    multiple
                    className=" border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option selected>--Select Size--</option>
                    {
                      size.map((items,index)=><option key={index} value={items._id}> {items.sizeName} </option>)
                    }
                  </select>
          </div>
          <div>
          <label className="block mb-5 text-md font-medium text-gray-900">Color</label>
          <select
                    id="default"
                    name='productColors[]'
                    multiple
                    className=" border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option selected>--Select Color--</option>
                    {
                      color.map((items,index)=><option key={index} value={items._id}> {items.colorName} </option>)
                    }
                  </select>
          </div>
          </div>
            
              <div className="pe-5 ps-1">
                <span className="flex items-center gap-3">
                  Status :
                  <input
                    id="link-radio"
                    name='status'
                    type="radio"
                    value="1"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                  ></input>
                  Active
                  <input
                    id="link-radio"
                    name='status'
                    type="radio"
                    value="0"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                  ></input>
                  Deactive
                </span>
              </div>
              <button
                type="submit"
                className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
  </section>
  )
}
