// Navbar.jsx
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useLogout from "../../hooks/useLogout";
import useMyAsset from "../../hooks/useMyAsset";

export default function Navbar() {
  const { user, isLoading } = useUser();
  const { assets } = useMyAsset();
  // console.log("ASSETS FROM NAVBAR: ", assets)
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="text-white font-semibold flex justify-between items-center px-5 relative bg-gray-950">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-yellow-500 font-bold text-lg flex items-center">
          
          <span className="text-yellow-400 text-2xl font-bold">CryptoCoin</span>
        </Link>
        <Link to="/crypto/buy" className="hover:text-yellow-500">Buy Crypto</Link>
        <Link to="/market" className="hover:text-yellow-500">Market</Link>
        <Link to="/trade" className="hover:text-yellow-500">Trade</Link>
      </div>

      <div className="flex items-center space-x-4 relative p-4">
        {isLoading ? (
          <div style={{ height: "48px" }}>Loading...</div>
        ) : user ? (
          <div className="relative group h-10 flex items-center">
            <div className="cursor-pointer h-10 w-10 flex justify-center items-center ">
              <FaUserCircle className="text-2xl" />
            </div>
            <div className="absolute right-0 top-full w-48 font-normal bg-gray-700 text-white rounded shadow-lg z-10 hidden group-hover:flex flex-col">
              <Link to="/my/dashboard" className="px-4 py-2 hover:bg-gray-600">Dashboard</Link>
              <Link to="/my/orders" className="px-4 py-2 hover:bg-gray-600">Orders</Link>
              <Link to="/my/asset" className="px-4 py-2 hover:bg-gray-600">Asset</Link>
              <Link to="/my/security" className="px-4 py-2 hover:bg-gray-600">Security</Link>
              <button onClick={handleLogout} className="px-4 py-2 hover:bg-gray-600">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="bg-gray-800 text-white px-4 h-10 flex items-center justify-center rounded
             hover:bg-gray-300 hover:text-black transition cursor-pointer"
          >
            Log In
          </Link>
        )}
      </div>

    </nav>
  );
}