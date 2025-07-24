// components/user/TradeHeader.jsx
import React from 'react';
import { Star, Search } from 'lucide-react';

const TradeHeader = ({ currentPrice, priceChange }) => {
  return (
    <div className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold">
              B
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">BTC/USDT</span>
                <span className="text-2xl font-bold">{currentPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>24h Chg: <span className="text-red-400">{priceChange} ({((priceChange / currentPrice) * 100).toFixed(2)}%)</span></span>
                <span>24h High: 119,273.36</span>
                <span>24h Low: 117,103.10</span>
                <span>24h Volume(BTC): 17,025.13</span>
                <span>24h Volume(USDT): 2,011,303,238.99</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-700 rounded">
            <button className="px-3 py-1 text-sm bg-yellow-500 text-black rounded-l">New</button>
            <button className="px-3 py-1 text-sm">USDC</button>
            <button className="px-3 py-1 text-sm bg-gray-600 rounded-r">USDT</button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 rounded px-10 py-2 text-sm w-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeHeader;
