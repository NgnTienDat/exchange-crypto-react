import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
import { useAuthContext } from "../../contexts/AuthContext";

export default function Navbar() {
  const { user , loading: isLoading, logout} = useAuthContext();
  const navigate = useNavigate()



  const handleLogout = () => {
    logout()
    navigate("/");

  };

  return (
    <nav className="text-white font-semibold flex justify-between items-center px-5 relative bg-gray-500">
      {/* Logo + menu */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-yellow-500 font-bold text-lg flex items-center">
          <div className="bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold mr-2">C</div>
          <span className="text-yellow-400 text-2xl font-bold">CryptoCoin</span>
        </Link>
        <Link to="/buy-crypto" className="hover:text-yellow-500">Buy Crypto</Link>
        <Link to="/market" className="hover:text-yellow-500">Markets</Link>
        <Link to="/trade" className="hover:text-yellow-500">Trade</Link>
      </div>

      {/* Search + Actions */}
      <div className="flex items-center space-x-4 relative">
        {user ? (
          <div className="relative group">
            {/* Avatar Icon */}
            <div className="cursor-pointer  p-5">
              <FaUserCircle className="text-2xl" />
            </div>

            {/* Dropdown menu */}
            <div className="absolute right-0 w-48 bg-white text-black rounded shadow-lg z-10 hidden group-hover:flex flex-col"
              onMouseEnter={(e) => e.currentTarget.classList.add('flex')}
              onMouseLeave={(e) => e.currentTarget.classList.remove('flex')}>
              <Link to="/my/dashboard" className="px-4 py-2 hover:bg-gray-100">Dashboard</Link>
              <Link to="/my/orders" className="px-4 py-2 hover:bg-gray-100">Orders</Link>
              <Link to="/my/asset" className="px-4 py-2 hover:bg-gray-100">Asset</Link>
              <Link to="/my/security" className="px-4 py-2 hover:bg-gray-100">Security</Link>
              <button
                onClick={handleLogout}
                // disabled={isLoading}
                className="px-4 py-2 hover:bg-gray-100"
              >
                {isLoading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="bg-gray-600 px-2 py-1 my-2 rounded hover:bg-gray-300 hover:text-black transition cursor-pointer"
          >
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
}
