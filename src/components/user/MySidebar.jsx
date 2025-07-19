import React, { useState } from 'react';
import {
    Home,
    Wallet,
    ShoppingCart,
    User,
    Settings,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MySidebar = () => {
    const navigate = useNavigate()
    const [openDropdowns, setOpenDropdowns] = useState({
        assets: false,
        orders: false,
        account: false
    });

    const [activeItem, setActiveItem] = useState('/my/dashboard');

    const toggleDropdown = (dropdown) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [dropdown]: !prev[dropdown]
        }));
    };

    const handleItemClick = (path) => {
        setActiveItem(path);
        // Here you would typically use navigate(path) or your routing method
        navigate(path)
        console.log('Navigate to:', path);
    };

    const isActive = (path) => activeItem === path;

    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen p-4 text-sm">
            <div className="space-y-2">
                {/* Dashboard */}
                <button
                    onClick={() => handleItemClick('/my/dashboard')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive('/my/dashboard')
                            ? 'bg-gray-700 text-white'
                            : 'hover:bg-gray-700'
                        }`}
                >
                    <Home className="text-md" />
                    <span className="font-medium">Dashboard</span>
                </button>

                {/* Assets */}
                <div>
                    <button
                        onClick={() => toggleDropdown('assets')}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeItem.includes('/my/asset')
                                ? 'bg-gray-700 text-white'
                                : 'hover:bg-gray-700'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <Wallet className="text-md" />
                            <span className="font-medium">Assets</span>
                        </div>
                        {openDropdowns.assets ? (
                            <ChevronUp className="text-sm" />
                        ) : (
                            <ChevronDown className="text-sm" />
                        )}
                    </button>

                    {openDropdowns.assets && (
                        <div className="ml-4 mt-2 space-y-1">
                            <button
                                onClick={() => handleItemClick('/my/asset')}
                                className={`w-full text-left p-2 pl-8 rounded transition-colors ${isActive('/my/asset')
                                        ? 'bg-gray-600 text-white'
                                        : 'hover:bg-gray-700 text-gray-300'
                                    }`}
                            >
                                Spot Wallet
                            </button>
                            <button
                                onClick={() => handleItemClick('/my/asset/futures')}
                                className={`w-full text-left p-2 pl-8 rounded transition-colors ${isActive('/my/asset/futures')
                                        ? 'bg-gray-600 text-white'
                                        : 'hover:bg-gray-700 text-gray-300'
                                    }`}
                            >
                                Futures Wallet
                            </button>
                            <button
                                onClick={() => handleItemClick('/my/asset/earn')}
                                className={`w-full text-left p-2 pl-8 rounded transition-colors ${isActive('/my/asset/earn')
                                        ? 'bg-gray-600 text-white'
                                        : 'hover:bg-gray-700 text-gray-300'
                                    }`}
                            >
                                Earn
                            </button>
                        </div>
                    )}
                </div>

                {/* Orders */}
                <div>
                    <button
                        onClick={() => toggleDropdown('orders')}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeItem.includes('/my/order')
                                ? 'bg-gray-700 text-white'
                                : 'hover:bg-gray-700'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <ShoppingCart className="text-md" />
                            <span className="font-medium">Orders</span>
                        </div>
                        {openDropdowns.orders ? (
                            <ChevronUp className="text-sm" />
                        ) : (
                            <ChevronDown className="text-sm" />
                        )}
                    </button>

                    {openDropdowns.orders && (
                        <div className="ml-4 mt-2 space-y-1">
                            <button
                                onClick={() => handleItemClick('/my/orders')}
                                className={`w-full text-left p-2 pl-8 rounded transition-colors ${isActive('/my/orders/spot')
                                        ? 'bg-gray-600 text-white'
                                        : 'hover:bg-gray-700 text-gray-300'
                                    }`}
                            >
                                Spot Orders
                            </button>
                            <button
                                onClick={() => handleItemClick('/my/orders/futures')}
                                className={`w-full text-left p-2 pl-8 rounded transition-colors ${isActive('/my/orders/futures')
                                        ? 'bg-gray-600 text-white'
                                        : 'hover:bg-gray-700 text-gray-300'
                                    }`}
                            >
                                Futures Orders
                            </button>
                            <button
                                onClick={() => handleItemClick('/my/orders/history')}
                                className={`w-full text-left p-2 pl-8 rounded transition-colors ${isActive('/my/orders/history')
                                        ? 'bg-gray-600 text-white'
                                        : 'hover:bg-gray-700 text-gray-300'
                                    }`}
                            >
                                Order History
                            </button>
                        </div>
                    )}
                </div>

                {/* Account */}
                <div>
                    <button
                        onClick={() => toggleDropdown('account')}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeItem.includes('/my/account')
                                ? 'bg-gray-700 text-white'
                                : 'hover:bg-gray-700'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <User className="text-md" />
                            <span className="font-medium">Account</span>
                        </div>
                        {openDropdowns.account ? (
                            <ChevronUp className="text-sm" />
                        ) : (
                            <ChevronDown className="text-sm" />
                        )}
                    </button>

                    {openDropdowns.account && (
                        <div className="ml-4 mt-2 space-y-1">
                            <button
                                onClick={() => handleItemClick('/my/account/profile')}
                                className={`w-full text-left p-2 pl-8 rounded transition-colors ${isActive('/my/account/profile')
                                        ? 'bg-gray-600 text-white'
                                        : 'hover:bg-gray-700 text-gray-300'
                                    }`}
                            >
                                Profile
                            </button>
                            <button
                                onClick={() => handleItemClick('/my/security')}
                                className={`w-full text-left p-2 pl-8 rounded transition-colors ${isActive('/my/account/security')
                                        ? 'bg-gray-600 text-white'
                                        : 'hover:bg-gray-700 text-gray-300'
                                    }`}
                            >
                                Security
                            </button>
                            <button
                                onClick={() => handleItemClick('/my/account/verification')}
                                className={`w-full text-left p-2 pl-8 rounded transition-colors ${isActive('/my/account/verification')
                                        ? 'bg-gray-600 text-white'
                                        : 'hover:bg-gray-700 text-gray-300'
                                    }`}
                            >
                                Verification
                            </button>
                        </div>
                    )}
                </div>

                {/* Settings */}
                <button
                    onClick={() => handleItemClick('/my/settings')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive('/my/settings')
                            ? 'bg-gray-700 text-white'
                            : 'hover:bg-gray-700'
                        }`}
                >
                    <Settings className="text-md" />
                    <span className="font-medium">Settings</span>
                </button>
            </div>
        </div>
    );
};

export default MySidebar;