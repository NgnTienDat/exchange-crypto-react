import React from 'react'
import { Outlet } from 'react-router-dom'
import MySidebar from '../../components/user/MySidebar'

const MyAccount = () => {
  return (
    <div className='flex'>
      <MySidebar />
      <div className="w-full min-h-screen">
        <Outlet />
      </div>
    </div>
  )
}

export default MyAccount