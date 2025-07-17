import React from 'react'
import { Outlet } from 'react-router-dom'

const Authentication = () => {
    return (
        <div className="">
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