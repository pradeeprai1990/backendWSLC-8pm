import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ViewSubCategory() {
    let apiBaseUrl = import.meta.env.VITE_APIBASEPATH;
    let [subcategory, setSubcategory] = useState([])
    let [staticPath, setStaticPath] = useState('')
    let getsubCategory = () => {
        axios.get(`${apiBaseUrl}admin/subcategory/view`)
            .then((res) => res.data)
            .then((finalRes) => {
                setSubcategory(finalRes.data)
                setStaticPath(finalRes.staticPath)
            })
    }

    useEffect(() => {
        getsubCategory()
    })
    return (
        <section className="w-full">
            <Breadcrumb path={"Sub Category"} path2={"View Sub Category"} slash={"/"} />
            <div className="w-full min-h-[610px]">
                <div className="max-w-[1220px] mx-auto py-5">
                    <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                        View Sub Category
                    </h3>
                    <div className="border border-t-0 rounded-b-md border-slate-400">


                        <div className="relative overflow-x-auto">
                            <table className="w-full  text-left rtl:text-right text-gray-500 ">
                                <thead className="text-sm text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Delete
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            S. No.
                                        </th>

                                        <th scope="col" className="px-6 py-3">
                                            Category Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Parent Category Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Image
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Description
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {subcategory.length >= 1 ?

                                        subcategory.map((subcatItem, index) => {
                                            return (
                                                <tr className="bg-white border-b">
                                                    <th scope="row" className="px-6 py-4 text-[18px] font-semibold text-gray-900 whitespace-nowrap ">

                                                        <input


                                                            name='deleteCheck' id="purple-checkbox" type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 " value={subcatItem._id} />


                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {subcatItem.subcategoryName}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {subcatItem.parentCategory.catName}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <img className='w-16 h-16 rounded-md object-cover' src={apiBaseUrl + staticPath + subcatItem.subcategoryImage} alt="" />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {subcatItem.subcategoryDesc}
                                                    </td>
                                                    <td className="px-6 py-4 flex gap-3 mt-6">

                                                        <svg fill='red' className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" /></svg>



                                                        |
                                                        <Link to={`/parent-category/add-category/${subcatItem._id}`}>
                                                            <svg fill='gold' className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" /></svg>
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {subcatItem.subcategoryStatus ? "Active" : "Deactive"}
                                                    </td>
                                                </tr>
                                            )
                                        })

                                        :
                                        <tr>
                                            <td colSpan={7}> No data Found</td>
                                        </tr>
                                    }


                                </tbody>


                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
