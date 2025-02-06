import React, { useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import axios, { toFormData } from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
export default function AddCategory() {

  let [preImagePath,setpreImagePath]=useState(`https://upload.wikimedia.org/wikipedia/commons/d/dc/No_Preview_image_2.png`)
  let [formDataValue, setformDataValue] = useState({
    categoryName: '',
    categoryDescription: '',
    status: 1,
  })
  let apiBaseUrl = import.meta.env.VITE_APIBASEPATH;
  let {id}=useParams();
 

  let navigate = useNavigate()
  let saveCategory = (event) => {




    event.preventDefault()

    let formValue = new FormData(event.target)

   if(id==undefined){
      axios.post(`${apiBaseUrl}admin/category/add`, formValue)
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.msg)
            setTimeout(() => {
              navigate('/parent-category/view-category')
            }, 2000)
          }
          else {
            toast.error("Category Name All ready exist...")
          }
        })

    }
    else{
      axios.put(`${apiBaseUrl}admin/category/update/${id}`, formValue)
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.msg)
            setTimeout(() => {
             navigate('/parent-category/view-category')
            }, 2000)
          }
          else {
            toast.error("Category Name All ready exist...")
          }
        })
    }
  }

  let imagePreview=(event)=>{
    
     try{
        let currentUrl=  URL.createObjectURL(event.target.files[0])
        setpreImagePath(currentUrl)
     } 
     catch{
        setpreImagePath('')
     }            
    

  }

  let getValueSetValue = (event) => {
    let inputName = event.target.name;
    let inputvalue = event.target.value;
    let oldData = { ...formDataValue }

    oldData[inputName] = inputvalue
    if (inputName == "status") {
      oldData[inputName] = Number(inputvalue)
    }

    setformDataValue(oldData)
  }


  useEffect(()=>{
    if(id){
      axios.get(`${apiBaseUrl}admin/category/editRow/${id}`)
      .then((res)=>res.data)
      .then((finalRes)=>{
       
        setformDataValue({
          categoryName: finalRes.data.catName,
          categoryDescription: finalRes.data.categoryDesc,
          status: finalRes.data.catStatus ? 1 : 0,
        })

        setpreImagePath(`${apiBaseUrl+finalRes.staticPath+finalRes.data.catImage}`)

      })
    }
    else{
      setformDataValue({
        categoryName: '',
        categoryDescription: '',
        status: 1,
      })
      setpreImagePath(`https://upload.wikimedia.org/wikipedia/commons/d/dc/No_Preview_image_2.png`)
    }
  },[id])





  return (
    <section className="w-full">
      <ToastContainer />
      <Breadcrumb
        path={"Parent Category"}
        path2={"Add Category"}
        slash={"/"}
      />

      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            Add Category
          </h3>
          <form onSubmit={saveCategory} className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="mb-5">
              <label
                for="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Category Name
              </label>
              <input
                type="text"
                name="categoryName"
                onChange={getValueSetValue}
                value={formDataValue.categoryName}
                id="base-input"
                className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                placeholder="Category Name"
              />
            </div>
            <div className="mb-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    for="base-input"
                    className="block mb-5 text-md font-medium text-gray-900"
                  >
                    Category Image
                  </label>

                  <label for="file-input" className="sr-only">
                    Choose file
                  </label>
                  <input
                    type="file"

                    name="categoryImage"
                    id="file-input"
                    onChange={imagePreview}
                    className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  
    file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4
    "

                  />

                </div>
                <div>
                  <img src={preImagePath} width={100} alt="" />
                </div>
              </div>

            </div>
            <div className="mb-5">
              <label
                for="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Category Description
              </label>
              <textarea
                value={formDataValue.categoryDescription}
                onChange={getValueSetValue}
                name="categoryDescription" id="message" rows="3" className=" resize-none block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Add Product Description....." />
            </div>
            <div className="pe-5 ps-1">
              <span className="flex items-center gap-3">
                Status :
                <input
                  id="link-radio"
                  name="status"
                  type="radio"
                  onChange={getValueSetValue}
                  checked={formDataValue.status === 1}
                  value="1"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                ></input>
                Active
                <input
                  id="link-radio"
                  name="status"
                  type="radio"
                  onChange={getValueSetValue}
                  value="0"
                  checked={formDataValue.status === 0}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                ></input>
                Deactive
              </span>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              { id ? "Update":"Save"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
