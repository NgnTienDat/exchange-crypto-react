// src/components/Market.js
import React, { useState } from 'react';
import TokenRow from '../../components/user/TokenRow';

const Market = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const tokenList = [
    { id: 'BTC-USD', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ETH-USD', name: 'Ethereum', symbol: 'ETH' },
    { id: 'DOGE-USD', name: 'Dogecoin', symbol: 'DOGE' },
    { id: 'XRP-USD', name: 'XRPcoin', symbol: 'XRP' },
    { id: 'USDT-USD', name: 'Tether', symbol: 'USDT' }
    // thêm các mã token khác tùy backend của bạn
  ];

  const filtered = tokenList.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header + Search */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">Top Tokens by Market Capitalization</h1>
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[30%] bg-gray-800 border border-gray-600 rounded-lg pl-4 pr-4 py-3 text-white placeholder-gray-400 mt-2
            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-700 border-b border-gray-600">
            <div className="text-gray-300 text-sm font-medium">Name</div>
            <div className="text-gray-300 text-sm font-medium">Price</div>
            <div className="text-gray-300 text-sm font-medium">Change</div>
            <div className="text-gray-300 text-sm font-medium">24h Volume</div>
            <div className="text-gray-300 text-sm font-medium">Market Cap</div>
            <div className="text-gray-300 text-sm font-medium text-center">Actions</div>
          </div>

          {/* Token Rows */}
          {filtered.length > 0 ? (
            filtered.map((token) => (
              <a href='#'>
                <TokenRow key={token.id} productId={token.id} />
              </a>
            ))
          ) : (
            <div className="px-6 py-8 text-center">
              <div className="text-gray-400 text-lg mb-2">No results found</div>
              <div className="text-gray-500 text-sm">
                Try searching for a different cryptocurrency name or symbol
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Market;
