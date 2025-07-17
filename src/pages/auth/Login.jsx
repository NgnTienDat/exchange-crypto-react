import React, { useState } from 'react';
import { Eye, EyeOff, QrCode } from 'lucide-react';
import { loginApi } from '../../services/userService';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const { isLoading, login } = useLogin()

  const handleSubmit = () => {
    console.log('Login attempted with:', { email, password, rememberMe });
    login({email, password})
  };

  return (
    <div className="flex items-center justify-center">
        <div className="w-96 bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700">
          {/* Logo and Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold mr-2">C</div>
                <span className="text-yellow-400 text-lg font-bold">CryptoCoin</span>
              </div>
              <QrCode className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
            </div>
            <p className="text-white text-2xl font-medium">Đăng nhập</p>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all border border-gray-600"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                  className="w-full bg-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all border border-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 w-4 h-4 rounded border-gray-600 bg-gray-700 text-yellow-400 focus:ring-yellow-400 focus:ring-1"
                />
                Ghi nhớ đăng nhập
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Quên mật khẩu?
              </a>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-yellow-400 hover:bg-yellow-500  font-medium py-3 px-4 rounded-lg transition-all duration-200 text-sm"
            >
              Tiếp theo
            </button>
           

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-600"></div>
              <span className="px-3 text-gray-400 text-sm">hoặc</span>
              <div className="flex-1 border-t border-gray-600"></div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-600"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm">Tiếp tục với Google</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6 text-sm">
            <span className="text-gray-400">Chưa có tài khoản? </span>
            <Link to="/auth/register" className="text-blue-400 hover:text-blue-300 transition-colors">
              Đăng ký ngay
            </Link>
          </div>
        </div>
    </div>
  );
};

export default Login;