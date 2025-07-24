// components/user/Orderbook.jsx
import React from 'react';
import { MoreHorizontal, TrendingUp } from 'lucide-react';

const Orderbook = ({ sellOrders, buyOrders, currentPrice }) => {
  return (
    <div className="w-1/5 bg-gray-800 border-r border-gray-700">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Order Book</h3>
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </div>

        <div className="space-y-1 text-xs">
          {/* Header */}
          <div className="flex justify-between text-gray-400 pb-2">
            <span>Price (USDT)</span>
            <span>Amount (BTC)</span>
            <span>Total</span>
          </div>

          {/* Sell Orders */}
          {sellOrders.map((order, index) => (
            <div key={index} className="flex justify-between text-red-400 hover:bg-gray-700 p-1 rounded">
              <span>{order.price.toFixed(2)}</span>
              <span>{order.amount.toFixed(5)}</span>
              <span>{order.total}K</span>
            </div>
          ))}

          {/* Current Price */}
          <div className="flex justify-between items-center py-3 border-y border-gray-600">
            <span className="text-green-400 font-bold">{currentPrice.toLocaleString()}</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>

          {/* Buy Orders */}
          {buyOrders.map((order, index) => (
            <div key={index} className="flex justify-between text-green-400 hover:bg-gray-700 p-1 rounded">
              <span>{order.price.toFixed(2)}</span>
              <span>{order.amount.toFixed(5)}</span>
              <span>{order.total}K</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orderbook;
