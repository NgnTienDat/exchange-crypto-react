import React from 'react'
import Navbar from './NavBar'
import { Outlet } from 'react-router-dom'

const Body = () => {
    return (
        <div className="min-h-screen w-screen bg-black text-white">
            <Navbar />
            <div className="">
                <Outlet />
            </div>
        </div>
    )
}

export default Body