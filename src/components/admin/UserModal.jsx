import React, { useState } from 'react';
import {
  X
} from 'lucide-react';
import useUserAsset from '../../hooks/useUserAsset';
import useUserOrder from '../../hooks/useUserOrder';
import useUserOrderStats from '../../hooks/useUserOrderStats';
import { Spinner } from '../Spinner';
import useDeleteUser from '../../hooks/useDeleteUser';

export const UserModal = ({ user, onClose, trades }) => {
  const [activeUserTab, setActiveUserTab] = useState('details');
  const { isLoading, assets } = useUserAsset(user?.id);
  
  // Pass onClose to the hook so it can close the modal after successful deletion
  const { isLoading: delLoading, delUser } = useDeleteUser(onClose);
  
  const { isLoading: statsLoading, stats } = useUserOrderStats(user?.id);
  console.log("stats: ", stats);

  const [page, setPage] = useState(0);
  const size = 5;

  const { isLoading: ordersLoading, orders, isFetching } = useUserOrder(user?.id, page, size);
  console.log("orders: ", orders);

  const userOrders = (orders?.content || []);

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (orders?.totalPages && page < orders.totalPages - 1) {
      setPage(page + 1);
    }
  };

  const hasNextPage = orders?.totalPages ? page < orders.totalPages - 1 : false;
  const hasPrevPage = page > 0;
  const totalPages = orders?.totalPages || 1;

  console.log("userOrders: ", userOrders);

  const handleUserAction = (userId, action) => {
    console.log(`${action} user ${userId}`);
    if (action === 'delete') {
      // Add confirmation before deleting
      if (window.confirm(`Are you sure you want to delete user: ${user.email}?`)) {
        delUser(userId); // This will automatically close the modal on success
      }
    }
  };

  const handleCancelOrder = (orderId) => console.log(`Cancel order ${orderId}`);

  const filledOrders = userOrders.filter(order => order.status === 'FILLED');

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
            className={`px-6 py-3 font-medium text-sm focus:outline-none
               ${activeUserTab === 'details' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            User Details
          </button>
          <button
            onClick={() => setActiveUserTab('orders')}
            className={`px-6 py-3 font-medium text-sm focus:outline-none 
              ${activeUserTab === 'orders' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Orders ({userOrders.length})
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {activeUserTab === 'details' && (
            <div className="space-y-6">
              {/* User details content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-blue-800">Email</label>
                  <p className="text-md text-gray-700 mt-1">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-800">User ID</label>
                  <p className="text-md text-gray-900 mt-1">{user.id}</p>
                </div>
                <div>
                  <label className="block text-md font-medium text-blue-800">Assets</label>
                  <div className="mt-1 space-y-2">
                    {isLoading ? (
                      <p className="text-gray-500">Loading assets...</p>
                    ) : assets && assets.length > 0 ? (
                      assets.map((asset, idx) => (
                        <div key={idx} className="flex space-x-5 items-center border rounded-md px-3 py-1">
                          <span className="text-gray-700 font-medium">{asset.cryptoId}:</span>
                          <span className="text-gray-800">
                            {asset.balance.toLocaleString()}
                            {asset.lockedBalance > 0 && (
                              <span className="ml-2 text-md text-red-600">(Locked: {asset.lockedBalance.toLocaleString()})</span>
                            )}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No assets found</p>
                    )}
                  </div>
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
                {statsLoading ? <Spinner size={18} className="text-blue-600" />
                  :
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-2xl font-semibold text-blue-600">{stats.totalOrder || 0}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Completed Trades</p>
                      <p className="text-2xl font-semibold text-green-600">{stats.completeTrades || 0}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Active Orders</p>
                      <p className="text-2xl font-semibold text-purple-600">{stats.activeOrder || 0}</p>
                    </div>
                  </div>
                }
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
                  disabled={delLoading}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    delLoading 
                      ? 'bg-gray-400 cursor-not-allowed text-white' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {delLoading ? 'Deleting...' : 'Delete User'}
                </button>
              </div>
            </div>
          )}

          {activeUserTab === 'orders' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-900">User Orders</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    Page {page + 1} of {totalPages}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={handlePrevious}
                      disabled={!hasPrevPage}
                      className={`px-3 py-1 text-sm rounded ${hasPrevPage
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!hasNextPage}
                      className={`px-3 py-1 text-sm rounded ${hasNextPage
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
              {userOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No orders found for this user</p>
              ) : (
                <div className="overflow-x-auto">
                  {isFetching && (
                    <div className="text-xs text-gray-500 mb-2">
                      Loading...
                    </div>
                  )}
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pair</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Side</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{order.pairId || '-'}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${order.side === 'BID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {order.side}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{order.type}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">${order.price.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{order.quantity}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'FILLED'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'PENDING'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                              }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm">
                            {order.status === 'PENDING' && (
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
        </div>
      </div>
    </div>
  );
};