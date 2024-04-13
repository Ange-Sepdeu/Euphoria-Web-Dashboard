"use client"
import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image"
import AddEditProduct from "./add-edit-product";
import axiosInstance from "../../lib/axiosInstance";


export default function Table({query, currentPage}) {
  const [mode, setMode] = useState("");
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(false);
  }
  const [allCategories, setAllCategories] = useState([])
  const [formData, setFormData] = useState(null);
  const handleOpenEdit = (data) => {
      setMode("Edit");
      setFormData(data);
  }
  const getAllCategories = () => {
    const url = "http://localhost:5000/api/admin/getCategories";
    axiosInstance.get(url)
    .then(response => setAllCategories(response.data.data))
    .catch(error => console.log(error))
}
  
 const handleOpenDelete  = async(product) => {
    if (window.confirm("Will you like to proceed"))
    {
        const  url = "http://localhost:5000/api/admin/deleteProduct";
        axiosInstance.put(url, product)
        .then ((resp) => alert(resp.data.message))
        .catch(error => alert(error.response.data.message))
    }
 }
useEffect(() => {
  getAllCategories()
  console.log(allCategories)
})
  return (
    <>
        <table className='w-full'>
          <thead className='text-[#B5B7C0] font-[400] text-[14px] leading-[21px] border-b border-[#B5B7C0]'>
            <tr>
            <th className='p-4'>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Country</th>
            <th>Status</th>
            <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          { [...allCategories].length === 0 ? <tr className="text-center">
          <td className="p-4" colSpan={5}> No data to display </td>
          </tr>
          :
          [...allCategories].map((category) => {
            [...category?.products].map((product, index) => {
              return (
                <tr key={index} className='border-b border-[#B5B7C0]'>
                <td className="p-4">{product.product_name}</td>
                <td className="p-4">{product.product_description}</td>
                <td className="p-4">{category.category_name}</td>
                <td>
                  <Image 
                    src={product.product_image_url}
                    className="mr-2 rounded-[12px]"
                    width={75}
                    height={75}
                    alt={`${product.product_name}'s image`}
                  />
                </td>
                <td className="p-4">{product.country}</td>
                <td className="p-4">
                  <button className={
                    clsx(
                      "p-4 rounded-[8px] capitalise",
                      {
                        "bg-[#16C09861] bg-opacity-38 text-[#00B087]": product.status === "active",
                        "bg-[#FFC5C5] text-[#DF0404]": product.status === "inactive"
                      }
                    )
                  }>{product.status}</button> 
                </td>
                <td className="p-4">
                <button onClick={() => handleOpenEdit(category, product)} className={`text-center bg-[#5932EA] text-white p-4 rounded-[8px]`}>Edit</button>
                <button onClick={() => handleOpenDelete(product)} className={`text-center bg-red-600 text-white p-4 rounded-[8px]`}>Delete</button>
                </td>
            </tr>
              )
            })   
          })
        }
          </tbody>
        </table>
        <AddEditProduct openPage={open} handleToggle={handleToggle} mode={mode} formData={formData} />
    </>
  )
}
