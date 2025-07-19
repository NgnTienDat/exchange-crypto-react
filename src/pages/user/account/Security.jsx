import React from 'react'
import { Link } from 'react-router-dom'

const Security = () => {
  return (
    <div className=''>
      <div>
        <div className='m-5 text-amber-300 flex flex-col'>
          <span className='text-white text-2xl font-semibold'>Two-Factor Authentication (2FA)</span>
          <Link to="/my/security/2fa">
            Enable Google Authenticator Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Security