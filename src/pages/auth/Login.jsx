import { useEffect, useState } from 'react';
import { Eye, EyeOff, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import { fingerprintToUUID, getDeviceId } from '../../utils/helper';
import VerifyCodeModal from '../../components/user/VerifyCodeModal';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [deviceId, setDeviceIdState] = useState('');
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [pendingUserId, setPendingUserId] = useState(null);

  const { isLoading, login } = useLogin({
    onRequire2FA: (userId) => {
      setPendingUserId(userId);  // lưu userId
      setShowVerifyModal(true);  // mở modal
    },
  });


  useEffect(() => {
    const existingDeviceId = getDeviceId();

    if (existingDeviceId) {
      setDeviceIdState(existingDeviceId);
      console.log("Existing Device UUID:", existingDeviceId);
    } else {
      fingerprintToUUID().then(uuid => {
        setDeviceIdState(uuid);
        console.log("Device UUID:", uuid);
      });
    }
  }, []);


  const handleSubmit = () => {
    const loginData = {
      email,
      password,
      deviceId,
      userAgent: navigator.userAgent
    };

    login(loginData);
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
          <p className="text-gray-800 text-2xl font-medium">Login</p>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 text-md mb-2">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-white text-gray-900 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all border border-gray-300"
            />
          </div>

          {/* Password Input */}
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

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400 focus:ring-1"
              />
              Remember me
            </label>
            <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-400 hover:bg-yellow-500 font-medium py-3 px-4 rounded-lg transition-all duration-200 text-sm text-black"
          >
            Continue
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-sm">Continue with Google</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6 text-sm">
          <span className="text-gray-600">Don’t have an account? </span>
          <Link to="/auth/signup" className="text-blue-500 hover:text-blue-600 transition-colors">
            Sign up now
          </Link>
        </div>
      </div>
      {showVerifyModal && (
        <VerifyCodeModal
          onClose={() => setShowVerifyModal(false)}
          userId={pendingUserId}
          deviceId={deviceId}
        />
      )}

    </div>
  );
};

export default Login;
