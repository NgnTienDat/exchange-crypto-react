import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../contexts/AuthContext'
import { Check, X } from 'lucide-react'
import useUser from '../../../hooks/useUser'

const Security = () => {
  // const {user} = useAuthContext()
  const {user} = useUser()
  
  return (
    <div className='px-7 py-5 rounded-2xl bg-white w-[50%] mt-5 ml-4'>
      <div className='mb-6'>
        <h2 className='text-black text-2xl font-semibold mb-4'>Security Checkup</h2>
      </div>
      
      <div>
        <div className='m-5 text-amber-300 flex items-center gap-3'>
          {/* Status icon - green check if enabled, gray X if disabled */}
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            user?.tfaEnabled 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-600 text-gray-300'
          }`}>
            {user?.tfaEnabled ? (
              <Check size={16} />
            ) : (
              <X size={16} />
            )}
          </div>
          
          <div className='flex flex-col'>
            <span className='text-black text-xl font-semibold'>Two-Factor Authentication (2FA)</span>
            {!user?.tfaEnabled ? (
              <Link to="/my/security/2fa" className='text-amber-400 hover:text-amber-200'>
                Enable Google Authenticator Now
              </Link>
            ) : (
              <span className='text-green-400'>Enabled</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Security