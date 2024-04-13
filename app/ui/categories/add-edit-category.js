"use client"

import { Close } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function AddEditCategory({ openPage,handleToggle, mode, formData=null}) {
    const handleClose = () => {
            handleToggle(false);
    }
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [categoryImageUrl, setCategoryImageUrl] = useState("");
    const [actionResponse, setActionResponse] = useState({message: "", severity:""});
    const handleCreateCategory = async() => {
        const url = "http://localhost:5000/api/admin/addCategory";
        axiosInstance.post(url, {category_name:categoryName, category_description:categoryDescription, category_image_url:categoryImageUrl})
        .then(response => setActionResponse({message: response.data.message, severity: "success"}))
        .catch(error => setActionResponse({message: error.response.data.message, severity:"error"})) 
    }
    const handleEditCategory = async () => {
        const url = "http://localhost:5000/api/admin/updateCategory";
        axiosInstance.put(url, {_id: formData._id,category_name:categoryName, category_description:categoryDescription, category_image_url:categoryImageUrl})
        .then(response => setActionResponse({message: response.data.message, severity: "success"}))
        .catch(error => setActionResponse({message: error.response.data.message, severity:"error"}))
    }
    const handleSubmit = () => {
            if (mode.toLowerCase() === "create")
                handleCreateCategory();
            else 
                handleEditCategory();
    }
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
      const { vertical, horizontal, open } = state;
      const handleCloseAlert = () => {
        setState({ ...state, open: false });
      };
  return (
    <>
        {openPage && 
                <>
                     <Snackbar open={actionResponse.message.length>0 && open} autoHideDuration={6000} anchorOrigin={{vertical, horizontal}} onClose={handleClose}>
                        <Alert
                        onClose={handleCloseAlert}
                        severity={actionResponse.severity}
                        variant="filled"
                        sx={{ width: '100%' }}
                        >
                        {actionResponse.message}
                        </Alert>
                    </Snackbar>
                <div className={`${!openPage && "hidden"} absolute top-0 left-30 h-[95vh] bg-black bg-opacity-60 p-8 w-[80vw]`}>
                <div className='bg-white absolute z-999 top-5 left-[20%] px-12 self-center w-[48vw] py-8 shadow-lg'>
                    <IconButton  onClick={() => handleClose()}>
                        <Close className="text-right right-5 text-[#3C4242]" />
                    </IconButton>
                <div className='flex flex-row w-6/12 justify-between items-center font-[300] leading-[33.5px] text-[28px]'>
                    <div className='rounded-[10px]  h-[30px] w-[6px] bg-[#8A33FD] '></div>
                    <div className='letter-2 text-[#3C4242] w-11/12'> {mode ? "Add Category": "Edit Category"} </div> 
                </div>
                <div className='font-[50] text-[22px] leading-[33.5px] text-[#3C4242] my-4'>Product Category</div>
                <form method='POST' onSubmit={() => handleSubmit()}>
                <div className='flex flex-row justify-between items-center flex-wrap w-11/12'>
                        <div className='w-6/12 mb-5'>
                            <div className='text-[16px] leading-[19.36px] font-[600] text-[#3C4242]'>Category Name*</div>
                            <input 
                                required 
                                type='text' 
                                 onChange={(e) =>setCategoryName(e.target.value)}
                                placeholder='e.g Jeans' 
                                className='outline-none p-3 bg-[#F6F6F6] text-[#807D7E] rounded-[10px]' 
                                />
                        </div>
                        <div className='w-6/12 mb-5'>
                            <div className='text-[16px] text-[#3C4242] leading-[19.36px] font-[600] text-[#3C4242]'>Product Description*</div>
                            <input 
                            type='text' 
                            required 
                            placeholder='Description' 
                            onChange={(e) =>setCategoryDescription(e.target.value)}
                            className='outline-none p-3 bg-[#F6F6F6] text-[#807D7E] rounded-[10px]' />
                        </div>
                        <div className='w-6/12 mb-5'>
                            <div className='text-[16px] leading-[19.36px] text-[#3C4242] font-[600] text-[#3C4242]'>Category Image URL*</div>
                            <input 
                            required 
                            type='text' 
                            onChange={(e) => setCategoryImageUrl(e.target.value)}
                            placeholder='https://example.images.com' 
                            className='outline-none p-3 bg-[#F6F6F6] text-[#807D7E] rounded-[10px]' />
                        </div>
                </div>
                 <button className='bg-[#5932EA] text-white rounded-[8px] p-3 mt-5'>{mode==="create" ? "Save Category":"Save Changes"}</button>
                 </form>
                </div>
        </div>
        </>
        }
    </>
  )
}
