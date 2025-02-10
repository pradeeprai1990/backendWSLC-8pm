import React, { useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import Breadcrumb from "../../common/Breadcrumb";
import Footer from "../../common/Footer";
import { ChromePicker } from "react-color";
import axios from "axios";

export default function AddColor() {
  let apiBaseUrl = import.meta.env.VITE_APIBASEPATH;
  let [formData,setFormData]=useState({colorName:'',colorCode:"#ccc",colorStatus:true})


  let getValueSetvalue=(event)=>{
    let olddata={...formData}
    let inputName=event.target.name;
    let inputValue=event.target.value;
    olddata[inputName]=inputValue; 
    setFormData(olddata)
  }

  let saveColor=(event)=>{
    event.preventDefault()
    axios.post(`${apiBaseUrl}admin/color/add`, formData)
    .then((res)=>{
      console.log(res.formData)
    })
  }

  return (
    <>
    <Breadcrumb path={"Colors"} path2={"Add Color"} slash={"/"} />
          <div className="w-full">
            <div className="max-w-[1220px] mx-auto py-5">
              <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">
                Add colors
              </h3>
              <form onSubmit={saveColor} className="p-3 border border-t-0 rounded-b-md border-slate-400">
                <div className="mb-5">
                  <label
                    for="base-input"
                    className="block mb-5 text-md font-medium text-gray-900"
                  >
                    Color Name
                  </label>
                  <input
                    type="text"
                    name="colorName"
                    onChange={getValueSetvalue}
                    id="base-input"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                    placeholder="Color Name"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="base-input"
                    className="block mb-8 text-md font-medium text-gray-900"
                  >
                    Color Picker
                  </label>
                  <ChromePicker color={formData.colorCode}  onChangeComplete={(event)=>{
                      let olddata={...formData}
                      olddata['colorCode'] = event.hex
                      setFormData(olddata)
                  }} />
                  <br />
                </div>
                <div className="pe-5 ps-1">
                  <span className="flex items-center gap-3">
                    Status :
                    <input
                      id="link-radio"
                      name="colorStatus"
                      type="radio"
                      onChange={getValueSetvalue}
                      value="1"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                    ></input>
                    Active
                    <input
                      id="link-radio"
                      name="colorStatus"
                      type="radio"
                      onChange={getValueSetvalue}
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
                  Select Color
                </button>
              </form>
            </div>
          </div>
          </>
  );
}
