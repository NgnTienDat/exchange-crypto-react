import React from 'react'
import { Outlet } from 'react-router-dom'

const Authentication = () => {
    return (
        <div className="bg-gray-900 h-screen flex justify-center items-center">
            {/* <Logo /> */}
            <div className="">
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Authentication