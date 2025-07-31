// components/user/TradeSidebar.jsx
import React from 'react';
import { Star } from 'lucide-react';

const TradeSidebar = ({ recentTrades, tradingPairs }) => {
  return (
    <div className="bg-gray-800 border-l border-gray-700">
      <div className="p-4">
        {/* Trading Pairs */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Market Trades</h3>
            <span className="text-sm text-gray-400">My Trades</span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-gray-400 pb-2">
              <span>Price (USDT)</span>
              <span>Amount (BTC)</span>
              <span>Time</span>
            </div>

            {recentTrades.map((trade, index) => (
              <div key={index} className={`flex justify-between ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'} hover:bg-gray-700 p-1 rounded`}>
                <span>{trade.price.toFixed(2)}</span>
                <span>{trade.amount.toFixed(5)}</span>
                <span className="text-gray-400">{trade.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Movers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Top Movers</h3>
            <span className="text-sm text-gray-400">FAQ</span>
          </div>

          {/* <div className="flex space-x-2 mb-4 text-sm">
            <button className="px-3 py-1 bg-gray-700 rounded">All</button>
            <button className="px-3 py-1 bg-gray-700 rounded">Change</button>
            <button className="px-3 py-1 bg-gray-700 rounded">New High/Low</button>
            <button className="px-3 py-1 bg-gray-700 rounded">Fluctuation</button>
          </div> */}

          <div className="space-y-2 text-sm">
            {tradingPairs.map((pair, index) => (
              <div key={index} className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
                <div className="flex items-center space-x-2">
                  <Star className="w-3 h-3 text-gray-400" />
                  <span className="font-medium">{pair.pair}</span>
                  <span className="text-xs bg-gray-600 px-1 rounded">{pair.volume}</span>
                </div>
                <div className="text-right">
                  <div>{pair.price}</div>
                  <div className={`text-xs ${pair.change < 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {pair.change > 0 ? '+' : ''}{pair.change}%
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
              <div className="flex items-center space-x-2">
                <span className="font-medium">SKU/BTC</span>
                <span className="text-xs bg-red-500 px-1 rounded text-white">NEW</span>
              </div>
              <div className="text-right">
                <div className="text-red-400">-10.00%</div>
                <div className="text-xs text-gray-400">18:05:13</div>
              </div>
            </div>

            <div className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
              <div className="flex items-center space-x-2">
                <span className="font-medium">NEWT/USDT</span>
                <span className="text-xs bg-green-500 px-1 rounded text-white">HOT</span>
              </div>
              <div className="text-right">
                <div className="text-green-400">+14.81%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeSidebar;
