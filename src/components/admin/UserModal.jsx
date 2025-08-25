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

export const UserModal = ({ user, onClose, orders, trades }) => {
  const [activeUserTab, setActiveUserTab] = useState('details');

  // Handlers are defined here but would typically be passed down or use a state management library
  const handleUserAction = (userId, action) => console.log(`${action} user ${userId}`);
  const handleCancelOrder = (orderId) => console.log(`Cancel order ${orderId}`);

  // Get user's orders and trades from props
  const userOrders = orders.filter(order => order.userId === user.id);
  const userTrades = trades.filter(trade => {
    const relatedOrder = orders.find(order => order.id === trade.orderId);
    return relatedOrder && relatedOrder.userId === user.id;
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-800">User Details - {user.email}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveUserTab('details')}
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${activeUserTab === 'details' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            User Details
          </button>
          <button
            onClick={() => setActiveUserTab('orders')}
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${activeUserTab === 'orders' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Orders ({userOrders.length})
          </button>
          <button
            onClick={() => setActiveUserTab('trades')}
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${activeUserTab === 'trades' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Trades ({userTrades.length})
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {activeUserTab === 'details' && (
            <div className="space-y-6">
              {/* User details content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {/* ${user.totalUsdValue.toLocaleString()} */}
1000
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Join Date</label>
                  <p className="text-lg text-gray-900 mt-1">{user.joinDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Status</label>
                  <div className="mt-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <button
                  onClick={() => handleUserAction(user.id, user.assetsLocked ? 'unlockAssets' : 'lockAssets')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${user.assetsLocked ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-yellow-600 hover:bg-yellow-700 text-white'}`}
                >
                  {user.assetsLocked ? 'Unlock Assets' : 'Lock Assets'}
                </button>
                <button
                  onClick={() => handleUserAction(user.id, user.accountLocked ? 'unlockAccount' : 'lockAccount')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${user.accountLocked ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
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
              {/* Orders Table */}
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
                            <span className={`px-2 py-1 rounded text-xs font-medium ${order.side === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {order.side}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{order.type}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">${order.price.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{order.amount}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'filled' ? 'bg-green-100 text-green-800' : order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{order.date}</td>
                          <td className="px-4 py-3 text-sm">
                            {order.status === 'pending' && (
                              <button
                                onClick={() => handleCancelOrder(order.id)}
                                className="text-red-600 hover:text-red-900 text-xs font-medium"
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
              {/* Trades Table */}
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
                          <td className="px-4 py-3 text-sm text-blue-600 hover:text-blue-900 cursor-pointer">{trade.orderId}</td>
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