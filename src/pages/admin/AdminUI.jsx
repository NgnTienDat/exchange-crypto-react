import React, { useEffect, useState } from 'react';
import {
    Users,
    Search,
    Settings,
    TrendingUp,
    BarChart3,
    FileText,
    Lock,
    Unlock,
    Trash2,
    Eye,
    X,
    ChevronDown,
    Calendar,
    DollarSign,
    Activity,
    BookOpen,
    Filter
} from 'lucide-react';
import { DashboardAdmin } from '../../components/admin/DashboardAdmin';
import { UserManagement } from '../../components/admin/UserManagement';
import { OrderManagement } from '../../components/admin/OrderManagement';
import { TradeManagement } from '../../components/admin/TradeManagement';
import useUser from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const usersData = [
    {
        id: 1,
        email: 'john@example.com',
        balances: [
            { asset: 'USDT', amount: 15240.50, usdValue: 15240.50 },
            { asset: 'BTC', amount: 0.35, usdValue: 15750.00 },
            { asset: 'ETH', amount: 5.2, usdValue: 14560.00 },
            { asset: 'BNB', amount: 12.8, usdValue: 3200.00 }
        ],
        totalUsdValue: 48750.50,
        status: 'active',
        assetsLocked: false,
        accountLocked: false,
        joinDate: '2024-01-15'
    },
    {
        id: 2,
        email: 'sarah@example.com',
        balances: [
            { asset: 'USDT', amount: 8750.25, usdValue: 8750.25 },
            { asset: 'BTC', amount: 0.12, usdValue: 5400.00 },
            { asset: 'ETH', amount: 2.1, usdValue: 5880.00 }
        ],
        totalUsdValue: 20030.25,
        status: 'active',
        assetsLocked: true,
        accountLocked: false,
        joinDate: '2024-02-03'
    },
    {
        id: 3,
        email: 'mike@example.com',
        balances: [
            { asset: 'USDT', amount: 0.00, usdValue: 0.00 }
        ],
        totalUsdValue: 0.00,
        status: 'locked',
        assetsLocked: false,
        accountLocked: true,
        joinDate: '2023-12-20'
    }
];

const ordersData = [
    { id: 101, userId: 1, pair: 'BTC/USDT', side: 'buy', type: 'limit', price: 45000, amount: 0.1, status: 'filled', date: '2024-03-10' },
    { id: 102, userId: 1, pair: 'ETH/USDT', side: 'sell', type: 'market', price: 2800, amount: 2, status: 'filled', date: '2024-03-11' },
    { id: 103, userId: 2, pair: 'BTC/USDT', side: 'buy', type: 'limit', price: 46000, amount: 0.05, status: 'pending', date: '2024-03-12' },
    { id: 104, userId: 1, pair: 'BNB/USDT', side: 'buy', type: 'limit', price: 250, amount: 10, status: 'pending', date: '2024-03-12' },
];

const tradesData = [
    { id: 201, orderId: 101, pair: 'BTC/USDT', price: 45000, amount: 0.1, fee: 4.5, date: '2024-03-10' },
    { id: 202, orderId: 102, pair: 'ETH/USDT', price: 2800, amount: 2, fee: 0.56, date: '2024-03-11' },
];

const AdminUI = () => {

    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const tabs = [
        { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { key: 'users', label: 'Users', icon: Users },
        { key: 'orders', label: 'Orders', icon: FileText },
        { key: 'trades', label: 'Trades', icon: TrendingUp }
    ];

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0`}>
                <div className="flex items-center justify-center h-16 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-900">Trading Admin</h1>
                </div>
                <nav className="mt-5 px-2">
                    <div className="space-y-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.key
                                        ? 'bg-blue-100 text-blue-900'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon className="mr-3 h-5 w-5" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </nav>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden flex justify-between items-center bg-white p-4 shadow-md">
                <h1 className="text-xl font-bold text-gray-900">Admin</h1>
                <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>

            {/* Main Content */}
            <main className="md:ml-64 p-4 sm:p-8">
                {activeTab === 'dashboard' && <DashboardAdmin />}
                {activeTab === 'users' && <UserManagement orders={ordersData} trades={tradesData} />}
                {activeTab === 'orders' && <OrderManagement orders={ordersData} />}
                {activeTab === 'trades' && <TradeManagement trades={tradesData} orders={ordersData} />}
            </main>
        </div>
    );
};

export default AdminUI;