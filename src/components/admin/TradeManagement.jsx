import React, { useEffect, useState, useMemo } from 'react';
import {
  Search,
} from 'lucide-react';
import useTrade from '../../hooks/useTrade';

export const TradeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const size = 10;
  const { tradeLoading, trades, pagination } = useTrade(page, size);
  
  console.log("trades: ", trades);

  // Toggle full ID display
  const toggleIdExpansion = (id) => {
    const newExpandedIds = new Set(expandedIds);
    if (newExpandedIds.has(id)) {
      newExpandedIds.delete(id);
    } else {
      newExpandedIds.add(id);
    }
    setExpandedIds(newExpandedIds);
  };

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Calculate fee (assuming 0.1% trading fee, you can adjust this)
  const calculateFee = (price, quantity, feeRate = 0.001) => {
    return (price * quantity * feeRate).toFixed(2);
  };

  // Filter trades based on search term
  const filteredTrades = useMemo(() => {
    if (!searchTerm.trim()) return trades;
    
    return trades.filter((trade) =>
      trade.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.takerOrderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.makerOrderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.productId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [trades, searchTerm]);

  // Reset to first page when search term changes
  useEffect(() => {
    if (searchTerm.trim()) {
      setPage(0);
    }
  }, [searchTerm]);

  const isOperationInProgress = tradeLoading;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Trade Management</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by Trade ID, Order ID, or Pair..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="relative">
          {tradeLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-600">Loading trades...</span>
              </div>
            </div>
          )}
          
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trade ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taker Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maker Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pair</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Fee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTrades.length > 0 ? (
                filteredTrades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <button
                        onClick={() => toggleIdExpansion(`trade-${trade.id}`)}
                        className="text-left hover:text-blue-600 cursor-pointer transition-colors"
                        title="Click to toggle full ID"
                      >
                        <div className={expandedIds.has(`trade-${trade.id}`) ? '' : 'truncate max-w-32'}>
                          {expandedIds.has(`trade-${trade.id}`) ? trade.id : `${trade.id?.slice(0, 8)}...`}
                        </div>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                      <button
                        onClick={() => toggleIdExpansion(`taker-${trade.takerOrderId}`)}
                        className="cursor-pointer transition-colors"
                        title="Click to toggle full ID"
                      >
                        <div className={expandedIds.has(`taker-${trade.takerOrderId}`) ? '' : 'truncate max-w-32'}>
                          {expandedIds.has(`taker-${trade.takerOrderId}`) ? trade.takerOrderId : `${trade.takerOrderId?.slice(0, 8)}...`}
                        </div>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {trade.makerOrderId === 'anonymous-order' ? (
                        <span className="text-gray-400 italic">Anonymous</span>
                      ) : (
                        <button
                          onClick={() => toggleIdExpansion(`maker-${trade.makerOrderId}`)}
                          className="cursor-pointer hover:text-blue-600 transition-colors"
                          title="Click to toggle full ID"
                        >
                          <div className={expandedIds.has(`maker-${trade.makerOrderId}`) ? '' : 'truncate max-w-32'}>
                            {expandedIds.has(`maker-${trade.makerOrderId}`) ? trade.makerOrderId : `${trade.makerOrderId?.slice(0, 8)}...`}
                          </div>
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {trade.productId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="font-medium">${trade.price?.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {trade.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${calculateFee(trade.price, trade.quantity)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-xs">
                        {formatDate(trade.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-sm text-gray-500">
                    {searchTerm ? (
                      <div>
                        <div className="text-gray-400 mb-2">No trades found matching "{searchTerm}"</div>
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Clear search
                        </button>
                      </div>
                    ) : (
                      'No trades available'
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Search results info */}
        {searchTerm && filteredTrades.length > 0 && (
          <div className="px-6 py-3 bg-blue-50 border-t">
            <div className="text-sm text-blue-800">
              Found {filteredTrades.length} trades matching "{searchTerm}"
            </div>
          </div>
        )}

        {/* Pagination controls */}
        <div className="flex space-x-5 my-3 justify-center items-center">
          <button
            disabled={page === 0 || isOperationInProgress}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 rounded disabled:opacity-50 text-gray-600 cursor-pointer hover:bg-gray-300 disabled:hover:bg-transparent"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {(pagination?.page ?? 0) + 1} {pagination?.totalPages && `/ ${pagination.totalPages}`}
          </span>
          <button
            disabled={!pagination?.hasNext || isOperationInProgress}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded disabled:opacity-50 text-gray-600 cursor-pointer hover:bg-gray-300 disabled:hover:bg-transparent"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};