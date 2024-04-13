"use client"

import MuiDrawer from '@mui/material/Drawer'
import Link from 'next/link'
import {Avatar, styled} from "@mui/material"
import React, { useState } from 'react'
import NavLinks from './nav-links';
import { Key, Settings, KeyboardArrowDown } from '@mui/icons-material'

const drawerWidth = 306

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 102,
  [theme.breakpoints.up('sm')]: {
    width: 102,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideNav() {
  const [open, setOpen] = useState(true);
  
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div className='w-4/12'>
      <Drawer variant="permanent" sx={{padding:16}} open={open}>
          <div onClick={() => handleDrawerToggle()} className={`p-4 cursor-pointer ml-2 my-5 leading-[39px] text-[26px] font-[600] w-10/12 flex flex-row ${open ? "justify-between":"text-center justify-center"} gap-2 items-center`}>
              <Settings sx={{fontSize: "40px"}} />
              {open && <div> Dashboard <span className='font-[400] text-[#838383] text-[10px] leading-[15px]'> v.01</span> </div>}
          </div>
          <div className={`flex text-[#9197B3] bg-white px-8 gap-3 py-3 w-4/12 flex-row ${open ? "justify-between" : "justify-center text-center mx-auto"} items-center`}>
            <Key className='border-2 rounded-[5px] p-1 border-[#9197B3]' />
            {open && <div>Dashboard</div>}
          </div>
          <NavLinks open={open} />
          {open && <div className='bg-gradient-to-r from-[#3A373B] from-7.37% to-[#1E0D69] to-95.19% text-center bg-[#1E0D69] w-10/12 p-4 mx-auto rounded-[10px] mt-[6%]'>
                <div className='text-white text-[14px] font-[600] '>Upgrade to  PRO to get <br />access all Features!</div>
                <button className='bg-white rounded-[10px] text-center mt-5 px-2 py-1'>Get Pro Now!</button>
          </div>}
          <div className={`flex  bg-white px-8 gap-4 py-3 w-10/12  flex-row ${open ? "justify-between" : "justify-center text-center mx-auto"} items-center`}>
          <div className={`flex  bg-white gap-3 w-11/12 flex-row ${open ? "justify-between" : "justify-center text-center mx-auto"} items-center`}>
            <Avatar/>
            {open && 
              <div>
                 <div className='text-[14px] font-[400] leading-[21px]'>Evano</div>
                 <div className='text-[12px] text-[#757575] font-[400] leading-[21px]'>Project Manager </div>
              </div>}
          </div>
              { open && <div className='w-2/12'>
              <KeyboardArrowDown />
              </div>}
          </div>
      </Drawer>
    </div>
  )
}
