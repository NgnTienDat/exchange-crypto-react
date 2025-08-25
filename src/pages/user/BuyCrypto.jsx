import React, { useState } from 'react';
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

const AdminUI = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [timeFilter, setTimeFilter] = useState('day');

  // Mock data
  const dashboardStats = {
    totalUsers: 12543,
    todayOrders: 1847,
    monthlyOrders: 45230,
    yearlyOrders: 892456
  };

  const users = [
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

  const orders = [
    { id: 'ORD001', userId: 1, pair: 'BTC/USDT', side: 'buy', type: 'limit', price: 45000, amount: 0.5, status: 'filled', date: '2024-08-25' },
    { id: 'ORD002', userId: 2, pair: 'ETH/USDT', side: 'sell', type: 'market', price: 2800, amount: 2.0, status: 'pending', date: '2024-08-25' },
    { id: 'ORD003', userId: 1, pair: 'BTC/USDT', side: 'sell', type: 'limit', price: 46000, amount: 0.3, status: 'cancelled', date: '2024-08-24' }
  ];

  const trades = [
    { id: 'TRD001', orderId: 'ORD001', pair: 'BTC/USDT', price: 45000, amount: 0.5, fee: 22.5, date: '2024-08-25 10:30:00' },
    { id: 'TRD002', orderId: 'ORD002', pair: 'ETH/USDT', price: 2800, amount: 2.0, fee: 5.6, date: '2024-08-25 11:15:00' }
  ];

  const orderBook = [
    { price: 45100, amount: 1.2, side: 'sell' },
    { price: 45050, amount: 0.8, side: 'sell' },
    { price: 45000, amount: 2.1, side: 'sell' },
    { price: 44950, amount: 1.5, side: 'buy' },
    { price: 44900, amount: 0.9, side: 'buy' },
    { price: 44850, amount: 2.3, side: 'buy' }
  ];

  const handleUserAction = (userId, action) => {
    console.log(`${action} user ${userId}`);
    // Implementation would go here
  };

  const handleCancelOrder = (orderId) => {
    console.log(`Cancel order ${orderId}`);
    // Implementation would go here
  };

  const UserModal = ({ user, onClose }) => {
    const [activeUserTab, setActiveUserTab] = useState('details');
    
    // Get user's orders
    const userOrders = orders.filter(order => order.userId === user.id);
    const userTrades = trades.filter(trade => {
      const relatedOrder = orders.find(order => order.id === trade.orderId);
      return relatedOrder && relatedOrder.userId === user.id;
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-5/6 max-w-4xl max-h-90vh overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-xl font-semibold">User Details - {user.email}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveUserTab('details')}
              className={`px-6 py-3 font-medium text-sm ${
                activeUserTab === 'details'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              User Details
            </button>
            <button
              onClick={() => setActiveUserTab('orders')}
              className={`px-6 py-3 font-medium text-sm ${
                activeUserTab === 'orders'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Orders ({userOrders.length})
            </button>
            <button
              onClick={() => setActiveUserTab('trades')}
              className={`px-6 py-3 font-medium text-sm ${
                activeUserTab === 'trades'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Trades ({userTrades.length})
            </button>
          </div>

          <div className="p-6 max-h-96 overflow-y-auto">
            {activeUserTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-lg text-gray-900 mt-1">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">User ID</label>
                    <p className="text-lg text-gray-900 mt-1">{user.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Balance (USD)</label>
                    <p className="text-lg font-semibold text-gray-900 mt-1">${user.totalUsdValue.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Join Date</label>
                    <p className="text-lg text-gray-900 mt-1">{user.joinDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Status</label>
                    <div className="mt-1">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Restrictions</label>
                    <div className="mt-1 space-y-1">
                      {user.assetsLocked && (
                        <span className="block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full w-fit">
                          Assets Locked
                        </span>
                      )}
                      {user.accountLocked && (
                        <span className="block px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full w-fit">
                          Account Locked
                        </span>
                      )}
                      {!user.assetsLocked && !user.accountLocked && (
                        <span className="block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full w-fit">
                          No Restrictions
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Quick Statistics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-2xl font-semibold text-blue-600">{userOrders.length}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Completed Trades</p>
                      <p className="text-2xl font-semibold text-green-600">{userTrades.length}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Active Orders</p>
                      <p className="text-2xl font-semibold text-purple-600">
                        {userOrders.filter(order => order.status === 'pending').length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t">
                  <button 
                    onClick={() => handleUserAction(user.id, user.assetsLocked ? 'unlockAssets' : 'lockAssets')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      user.assetsLocked 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    }`}
                  >
                    {user.assetsLocked ? 'Unlock Assets' : 'Lock Assets'}
                  </button>
                  <button 
                    onClick={() => handleUserAction(user.id, user.accountLocked ? 'unlockAccount' : 'lockAccount')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      user.accountLocked 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {user.accountLocked ? 'Unlock Account' : 'Lock Account'}
                  </button>
                  <button 
                    onClick={() => handleUserAction(user.id, 'delete')}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            )}

            {activeUserTab === 'orders' && (
              <div>
                <h4 className="font-medium text-gray-900 mb-4">User Orders</h4>
                {userOrders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No orders found for this user</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pair</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Side</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {userOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{order.pair}</td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                order.side === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {order.side}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">{order.type}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">${order.price.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{order.amount}</td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === 'filled' ? 'bg-green-100 text-green-800' :
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">{order.date}</td>
                            <td className="px-4 py-3 text-sm">
                              {order.status === 'pending' && (
                                <button 
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="text-red-600 hover:text-red-900 text-xs"
                                >
                                  Cancel
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeUserTab === 'trades' && (
              <div>
                <h4 className="font-medium text-gray-900 mb-4">User Trades</h4>
                {userTrades.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No trades found for this user</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trade ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pair</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {userTrades.map((trade) => (
                          <tr key={trade.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{trade.id}</td>
                            <td className="px-4 py-3 text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                              {trade.orderId}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{trade.pair}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">${trade.price.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{trade.amount}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">${trade.fee}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{trade.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Dashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Today's Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.todayOrders.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Monthly Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.monthlyOrders.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Yearly Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.yearlyOrders.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Time Filter for Orders */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Orders Analysis</h3>
          <select 
            value={timeFilter} 
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="day">Daily</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </div>
        <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
          <p className="text-gray-500">Chart visualization would go here</p>
        </div>
      </div>
    </div>
  );

  const UserManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.filter(user => 
              user.email.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.email}</div>
                  <div className="text-sm text-gray-500">ID: {user.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">${user.totalUsdValue.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">
                    {user.balances.length} assets
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                    {user.assetsLocked && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Assets Locked
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {setSelectedUser(user); setShowUserModal(true);}}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => handleUserAction(user.id, user.accountLocked ? 'unlock' : 'lock')}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      {user.accountLocked ? <Unlock size={16} /> : <Lock size={16} />}
                    </button>
                    <button 
                      onClick={() => handleUserAction(user.id, 'delete')}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const OrderManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by Order ID or Pair..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pair</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Side/Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.userId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.pair}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.side === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {order.side}
                    </span>
                    <span className="ml-2 text-gray-500">{order.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>${order.price.toLocaleString()}</div>
                  <div className="text-gray-500">{order.amount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'filled' ? 'bg-green-100 text-green-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {order.status === 'pending' && (
                    <button 
                      onClick={() => handleCancelOrder(order.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Book */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Order Book (BTC/USDT)</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-red-600 mb-2">Sell Orders</h4>
            <div className="space-y-1">
              {orderBook.filter(order => order.side === 'sell').map((order, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-red-600">${order.price.toLocaleString()}</span>
                  <span className="text-gray-600">{order.amount}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-green-600 mb-2">Buy Orders</h4>
            <div className="space-y-1">
              {orderBook.filter(order => order.side === 'buy').map((order, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-green-600">${order.price.toLocaleString()}</span>
                  <span className="text-gray-600">{order.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TradeManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Trade Management</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by Order ID or Pair..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trade ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pair</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trades.map((trade) => (
              <tr key={trade.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {trade.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                  {trade.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {trade.pair}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${trade.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {trade.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${trade.fee}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {trade.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { key: 'users', label: 'Users', icon: Users },
    { key: 'orders', label: 'Orders', icon: FileText },
    { key: 'trades', label: 'Trades', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
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
                  className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.key
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

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'orders' && <OrderManagement />}
        {activeTab === 'trades' && <TradeManagement />}
      </div>

      {/* User Modal */}
      {showUserModal && selectedUser && (
        <UserModal 
          user={selectedUser} 
          onClose={() => {setShowUserModal(false); setSelectedUser(null);}} 
        />
      )}
    </div>
  );
};

export default AdminUI;