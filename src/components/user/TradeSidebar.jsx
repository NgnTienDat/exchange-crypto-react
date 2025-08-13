import React, { useState, useEffect } from 'react';
import useSubscribeMarketTrade from '../../hooks/useSubscribeMarketTrade';

const TradeSidebar = ({ tradingPairs, productId }) => {
  const [recentTrades, setRecentTrades] = useState([]);

  // **GIẢ ĐỊNH:** Server của bạn sẽ trả về một trường boolean là `isBuyerMaker`.
  // `true` nếu bên mua là Maker (tương đương "m": true của Binance).
  // `false` nếu bên mua là Taker (tương đương "m": false của Binance).
  useSubscribeMarketTrade(productId, (data) => {
    const newTrade = {
      price: data.price,
      amount: data.quantity,
      time: new Date(data.tradeTime).toLocaleTimeString('en-GB'), // 'en-GB' để có format HH:mm:ss
      // --- LOGIC SỬA ĐỔI ---
      // Nếu bên mua là Maker -> đây là lệnh Bán chủ động (Màu đỏ)
      // Nếu bên mua là Taker -> đây là lệnh Mua chủ động (Màu xanh)
      type: data.isMaker ? 'sell' : 'buy', 
    };

    setRecentTrades((prev) => {
      const updated = [newTrade, ...prev];
      return updated.slice(0, 15);
    });
  });

  return (
    <div className="rounded bg-white">
      <div className="p-4">
        {/* Market Trades */}
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
              <div
                key={index}
                className={`flex justify-between font-bold ${
                  // Logic hiển thị màu không cần thay đổi
                  trade.type === 'buy' ? 'text-green-500' : 'text-red-400'
                } hover:bg-gray-700 p-1 rounded transition-all duration-150 ease-in-out`}
              >
                <span>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(trade.price)}</span>
                <span>{trade.amount.toFixed(5)}</span>
                <span className="text-gray-400">{trade.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeSidebar;