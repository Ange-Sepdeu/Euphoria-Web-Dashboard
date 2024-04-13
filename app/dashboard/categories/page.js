"use client"
import Table from '../../ui/categories/table'
import Filter from '../../ui/filter'
import Search from '../../ui/search'
import React, { useEffect, useState } from 'react'
import { ArrowDownward, ArrowUpward, DesktopWindowsOutlined, PeopleAlt, PeopleAltOutlined, Person, PersonOutline } from '@mui/icons-material'
import Pagination from '../../ui/pagination'
import AddEditCategory from '../../ui/categories/add-edit-category'
import axiosInstance from '../../lib/axiosInstance'

export default function Category() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");
  const handleToggle = () => {
    setOpen(false);
  }
 
  return (
    <>
      <div className='bg-[#FAFBFF] h-[95vh] w-[85%] mx-auto'>
            <div className='flex mt-7 flex-row justify-between items-center'>
                  <div className='font-400 text-[24px] leading-[36px]'>Hello Evano 👋🏼,</div>
            </div>
            <div className='mt-7 flex flex-row justify-between items-center bg-white shadow rounded-[15px] p-4'>
               <div className='flex w-[32%] gap-3 flex-row justify-between items-center'>
                  <PeopleAltOutlined className='text-[80px] p-4 rounded-full bg-[#00AC4F] bg-opacity-20 text-[#00AC4F]' />
                  <div className='w-9/12'>
                    <div className='font-[400] leading-[21px] text-[14px] text-[#ACACAC]'>Categories</div>
                    <div className='font-[600] leading-[32px] text-[32px]'>23</div>
                    <div className='flex flex-row justify-left items-center'>
                      <ArrowUpward className='text-[#00AC4F]' />
                      <div className='text-[12px] leading-[18px] font-[400]'><span className='text-[#00AC4F] font-[700]'>16%</span> this month</div>
                    </div>
                  </div>
               </div>
               <div className='flex w-[32%] gap-3 flex-row justify-between items-center'>
                  <PersonOutline className='text-[80px] p-4 rounded-full bg-[#00AC4F] bg-opacity-20 text-[#00AC4F]' />
                  <div className='w-9/12'>
                    <div className='font-[400] leading-[21px] text-[14px] text-[#ACACAC]'>Avg Sale Per Category</div>
                    <div className='font-[600] leading-[32px] text-[32px]'>100</div>
                    <div className='flex flex-row justify-left items-center'>
                      <ArrowDownward className='text-[#D0004B]' />
                      <div className='text-[12px] leading-[18px] font-[400]'><span className='text-[#D0004B] font-[700]'>16%</span> this month</div>
                    </div>
                  </div>
               </div>
               <div className='flex w-[32%] gap-3 flex-row justify-between items-center'>
                  <DesktopWindowsOutlined className='text-[80px] p-4 rounded-full bg-[#00AC4F] bg-opacity-20 text-[#00AC4F]' />
                  <div className='w-9/12'>
                    <div className='font-[400] leading-[21px] text-[14px] text-[#ACACAC]'>Cats with Products</div>
                    <div className='font-[600] leading-[32px] text-[32px]'>19</div>
                   </div>
               </div>
            </div>
            <div className='bg-white p-6 h-[65vh] rounded-[15px] mt-7 shadow'>
                <div className='flex flex-row justify-between items-center'>
                  <div className='w-7/12'>
                      <div className='font-[600] text-[22px] leading-[33px]'>Categories</div>
                      <div className='font-[400] text-[#16C098] text-[14px] leading-[21px]'>Active Categories</div>
                  </div>
                  <div className='flex flex-row gap-2 justify-between items-center w-[5/12]'>
                    <Search />
                    <Filter />
                  </div>
                  
                </div>
                <button onClick={() => {setOpen(true); setMode("Create")}} className='mt-5 bg-[#16C098] text-white hover:text-[#16C098] hover:bg-[white] rounded-[10px] p-2'>Add a category</button>
                <div className='bg-white mt-5'>
                    <Table />
                  </div>
                <div className='mt-5 bg-white'>
                    <Pagination totalPages={10} />
                </div>
            </div>
      </div>
      <AddEditCategory mode={mode} handleToggle={handleToggle} openPage={open} />
      </>
  )
}
