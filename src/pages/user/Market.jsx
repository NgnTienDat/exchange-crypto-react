// src/components/Market.js
import React, { useState } from 'react';
import TokenRow from '../../components/user/TokenRow';

const Market = () => {
  console.log("Market render");

  const [searchTerm, setSearchTerm] = useState('');

  const tokenList = [
    { id: 'BTC-USDT', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ETH-USDT', name: 'Ethereum', symbol: 'ETH' },
    { id: 'ADA-USDT', name: 'Cardano', symbol: 'ADA' },
    { id: 'DOT-USDT', name: 'Polkadot', symbol: 'DOT' },
    { id: 'BNB-USDT', name: 'BNB', symbol: 'BNB' },
    { id: 'SOL-USDT', name: 'Solana', symbol: 'SOL' }
    // thêm các mã token khác tùy backend của bạn btcusdt, ethusdt, adausdt, dotusdt, bnbusdt, solusdt
  ];

  const filtered = tokenList.filter(token => 
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) 
  
  );

  return (
    <div className="text-black min-h-screen p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header + Search */}
        <div className="mb-6">
          <h1 className="text-lg font-semibold mb-2">Top Tokens by Market Capitalization</h1>
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[30%] bg-white  rounded-lg px-4 py-1 text-white placeholder-gray-400 mt-2
            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Table */}
        <div className=" rounded-lg overflow-hidden bg-white">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 px-6 py-4 text-gray-400 text-sm">
            <div className="">Name</div> 
            <div className="text-right">Price</div>
            <div className="text-right">24h Change</div>
            <div className="text-right">24h Volume</div>
            <div className="text-right">Market Cap</div>
            <div className="text-right">Actions</div>
          </div>


          {/* Token Rows */}
          {filtered.length > 0 ? (
            filtered.map((token) => (
              // <a >
              <TokenRow key={token.id} product={token} />
              // </a>
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
