import React from 'react'
import Navbar from './NavBar'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-950 text-white ">
      {/* Navbar cố định ở trên cùng */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Phần nội dung cần thêm padding-top để tránh bị che bởi navbar */}
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  )
}

export default Body
