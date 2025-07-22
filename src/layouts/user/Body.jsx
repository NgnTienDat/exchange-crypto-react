import React from 'react'
import Navbar from './NavBar'
import { Outlet } from 'react-router-dom'

const Body = () => {
    return (
        <div className="min-h-screen w-screen bg-gray-950 text-white">
            <Navbar />
            <div className="">
                <Outlet />
            </div>
        </div>
    )
}

export default Body