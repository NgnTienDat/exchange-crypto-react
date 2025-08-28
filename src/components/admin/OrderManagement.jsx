import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter
} from 'lucide-react';
import useOrders from '../../hooks/useOrders';
import useOrderBook from '../../hooks/useOrderBook';
import useUser from '../../hooks/useUser';
import useNotificationAdmin from '../../hooks/useNotificationAdmin';

export const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [activePair, setActivePair] = useState('BTC-USDT');
  const size = 3;
  
  const tradingPairs = [
    { id: 'BTC-USDT', label: 'BTC/USDT', name: 'Bitcoin' },
    { id: 'ETH-USDT', label: 'ETH/USDT', name: 'Ethereum' },
    { id: 'ADA-USDT', label: 'ADA/USDT', name: 'Cardano' },
    { id: 'DOT-USDT', label: 'DOT/USDT', name: 'Polkadot' },
    { id: 'BNB-USDT', label: 'BNB/USDT', name: 'Binance Coin' },
    { id: 'SOL-USDT', label: 'SOL/USDT', name: 'Solana' }
  ];

  const {user} = useUser()
  useNotificationAdmin(user?.id)
  const { allOrdersLoading, orders, pagination } = useOrders(page, size);
  const { askLoading, bidLoading, askOrders, bidOrders } = useOrderBook(activePair, 10);
  
  console.log("ask: ", askOrders);
  console.log("bid: ", bidOrders);

  const handleCancelOrder = (orderId) => {
    console.log(`Cancel order ${orderId}`);
    // Implementation would go here
  };

  const handlePairChange = (pairId) => {
    setActivePair(pairId);
    // Reset page when changing pairs
    setPage(0);
  };

  // Memoize filtered orders to prevent unnecessary recalculations
  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) return orders;
    
    return orders.filter((order) =>
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.pairId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  // Reset to first page when search term changes
  React.useEffect(() => {
    if (searchTerm.trim()) {
      setPage(0);
    }
  }, [searchTerm]);

  const isOperationInProgress = allOrdersLoading;
  const currentPair = tradingPairs.find(pair => pair.id === activePair);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Enter order ID or pair..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-700
               focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Trading Pairs Tabs */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tradingPairs.map((pair) => (
              <button
                key={pair.id}
                onClick={() => handlePairChange(pair.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  activePair === pair.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold">{pair.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{pair.name}</div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Orders Table */}
        <div className="relative">
          {allOrdersLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
              <div className="text-sm text-gray-600">Loading...</div>
            </div>
          )}
          
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
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.pairId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <span className={`px-2 py-1 rounded text-xs ${order.side === 'BID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {order.side === 'BID' ? 'buy' : 'sell'}
                        </span>
                        <span className="ml-2 text-gray-500">{order.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>${order.price?.toLocaleString()}</div>
                      <div className="text-gray-500">{order.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${order.status?.toLowerCase() === 'filled' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        {order.status?.toLowerCase()}
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
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    {searchTerm ? 'No orders found matching your search' : 'No orders available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex space-x-5 justify-center items-center">
        <button
          disabled={page === 0 || isOperationInProgress}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 rounded disabled:opacity-50 text-gray-600 cursor-pointer hover:bg-gray-300 disabled:hover:bg-transparent"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {(pagination?.page ?? 0) + 1} / {pagination?.totalPages ?? 1}
        </span>
        <button
          disabled={page >= (pagination?.totalPages ?? 1) - 1 || isOperationInProgress}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded disabled:opacity-50 text-gray-600 cursor-pointer hover:bg-gray-300 disabled:hover:bg-transparent"
        >
          Next
        </button>
      </div>

      {/* Order Book */}
      <div className="bg-white text-gray-600 shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Order Book</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Current Pair:</span>
            <span className="text-sm font-semibold text-blue-600">{currentPair?.label}</span>
            {(askLoading || bidLoading) && (
              <span className="text-xs text-gray-400">(Loading...)</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-red-600 mb-2">Sell Orders (Ask)</h4>
            <div className="space-y-1 min-h-[200px]">
              {askOrders.length > 0 ? (
                askOrders.map((order, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-red-600">${order.price.toLocaleString()}</span>
                    <span className="text-gray-600">{order.quantity}</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 text-sm py-8">
                  {askLoading ? 'Loading sell orders...' : 'No sell orders available'}
                </div>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-green-600 mb-2">Buy Orders (Bid)</h4>
            <div className="space-y-1 min-h-[200px]">
              {bidOrders.length > 0 ? (
                bidOrders.map((order, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-green-600">${order.price.toLocaleString()}</span>
                    <span className="text-gray-600">{order.quantity}</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 text-sm py-8">
                  {bidLoading ? 'Loading buy orders...' : 'No buy orders available'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};