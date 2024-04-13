"use client"
import { useEffect, useState } from "react";
import AddEditCategory from "./add-edit-category";
import clsx from "clsx";
import Image from "next/image"
import axiosInstance from "../../lib/axiosInstance";
import axios from "axios";

export default function Table() {
  const [mode, setMode] = useState("");
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(false);
  }
  const [allCategories, setAllCategories] = useState([])
  const [formData, setFormData] = useState(null);
  const handleOpenEdit = (data) => {
      setMode("Edit");
      setOpen(true);
      setFormData(data);
  }
  const handleOpenDelete  = async(product) => {
    if (window.confirm("Will you like to proceed"))
    {
        const  url = "http://localhost:5000/api/admin/deleteCategory";
        axiosInstance.put(url, product)
        .then ((resp) => alert(resp.data.message))
        .catch(error => alert(error.response.data.message))
    }
 }
  const getAllCategories = () => {
    const url = "http://localhost:5000/api/admin/getCategories";
    axios.get(url)
    .then(response => {
      console.log(response.data)
      setAllCategories(response.data.data)
    })
    .catch(error => console.log(error))
}
useEffect(() => {
  getAllCategories()
})
  return (
    <>
    <table className='w-full'>
    <thead className='text-[#B5B7C0] font-[400] text-[14px] leading-[21px] border-b border-[#B5B7C0]'>
      <tr>
      <th className='p-4'>Name</th>
      <th>Description</th>
      <th>Image</th>
      <th>Status</th>
      <th>Actions</th>
      </tr>
    </thead>
    <tbody>
        { [...allCategories].length === 0 ? <tr className="text-center">
          <td className="p-4" colSpan={5}> No data to display </td>
          </tr>
          :
          [...allCategories].map((category, index) => (
            <tr key={index} className='border-b border-[#B5B7C0]'>
                <td className="p-4 text-center">{category.category_name}</td>
                <td className="p-4 text-center">{category.category_description}</td>
                <td className="text-center mx-auto">
                  <Image 
                  loader={() => category.category_image_url}
                    src={category.category_image_url}
                    className="mr-2 rounded-[12px]"
                    width={75}
                    height={75}
                    alt={`${category.category_name}'s image`}
                  />
                </td>
                <td className="p-4 text-center">
                  <button className={
                    clsx(
                      "p-4 rounded-[8px] capitalize",
                      {
                        "bg-[#16C09861] bg-opacity-38 text-[#00B087]": category.status === "active",
                        "bg-[#FFC5C5] text-[#DF0404]": category.status === "inactive"
                      }
                    )
                  }>{category.status}</button> 
                </td>
                <td className="p-4 text-center">
                <button onClick={() => handleOpenEdit(category)} className={`text-center bg-[#5932EA] p-4 text-white rounded-[8px]`}>Edit</button>
                <button onClick={() => handleOpenDelete(category)} className={`text-center ml-2 bg-red-600 text-white p-4 rounded-[8px]`}>Delete</button>
                </td>
            </tr>   
          ))
        }
    </tbody>
  </table>
  <AddEditCategory openPage={open} handleToggle={handleToggle} formData={formData} mode={mode} />
  </>
  )
}
