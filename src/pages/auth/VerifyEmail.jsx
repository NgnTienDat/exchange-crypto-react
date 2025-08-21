import React, { useState } from 'react';
import { Eye, EyeOff, QrCode } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleSubmit = () => {
    // do something
    navigate('/auth/password', { state: { email } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-96 bg-white rounded-2xl p-6 shadow-2xl border border-gray-200">
        {/* Logo and Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-yellow-500 text-lg font-bold">CryptoCoin</span>
            </div>
            <QrCode className="w-6 h-6 text-gray-500 cursor-pointer hover:text-black transition-colors" />
          </div>
          <p className="text-gray-800 text-2xl font-medium">Verify your email</p>
        </div>

        <div className='text-gray-500 text-sm py-5'>
          <span>A 6-digit has been sent to <span className='text-gray-800 font-semibold'>{email}</span>. Please enter it within the next 30 minutes</span>
          <span></span><br />
          <span></span>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Verification code</label>
            <input
              type="text"
              placeholder="Enter code from your email"
              className="w-full bg-white text-gray-900 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all border border-gray-300"
            />
          </div>



          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="w-full cursor-pointer bg-yellow-400 hover:bg-yellow-500 font-medium py-3 px-4 rounded-lg transition-all duration-200 text-sm text-black"
          >
            Next
          </button>

         

        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6 text-sm font-bold">
          <Link to="" className="text-yellow-500 cursor-pointer">
            Didn't receive the code?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
