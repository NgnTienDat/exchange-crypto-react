import React, { useState } from 'react';
import { Eye, EyeOff, QrCode } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSignUp from '../../hooks/useSignUp';

const CreatePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const { isLoading, signUp } = useSignUp();

  const handleSubmit = () => {
    // const data = {
    //   email: email,
    //   password: password
    // }

    // console.log("data: ", data)
    signUp({email, password})
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
          <p className="text-gray-800 text-2xl font-medium">Create a password</p>
        </div>



        {/* Login Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-md mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-white text-gray-900 placeholder-gray-400 rounded-lg 
                            px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all border border-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className='text-gray-500 text-sm py-5'>
            <span>0 to 128 characters</span><br />
            <span>At least 1 number</span><br />
            <span>At least 1 upper case letter</span>
          </div>


          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="w-full cursor-pointer bg-yellow-400 hover:bg-yellow-500 font-medium py-3 px-4 rounded-lg transition-all duration-200 text-sm text-black"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
