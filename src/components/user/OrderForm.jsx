// components/user/OrderForm.jsx
import React from 'react';

const OrderForm = ({
  orderType, setOrderType,
  buyAmount, setBuyAmount,
  sellAmount, setSellAmount,
  buyPrice, setBuyPrice,
  sellPrice, setSellPrice
}) => {
  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderType === 'buy') {
      console.log('Mua:', { amount: buyAmount, price: buyPrice });
    } else {
      console.log('Bán:', { amount: sellAmount, price: sellPrice });
    }
  };

  return (
    <div className="bg-neutral-800 rounded p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Buy Form */}
        <div className="space-y-4">
          <div className="flex space-x-2 mb-4">
            <button
              className={`px-4 py-2 text-sm rounded ${orderType === 'limit' ? 'bg-yellow-500 text-black' : 'bg-gray-700'}`}
              onClick={() => setOrderType('limit')}
            >
              Limit
            </button>
            <button
              className={`px-4 py-2 text-sm rounded ${orderType === 'market' ? 'bg-yellow-500 text-black' : 'bg-gray-700'}`}
              onClick={() => setOrderType('market')}
            >
              Market
            </button>
            <button
              className={`px-4 py-2 text-sm rounded ${orderType === 'stop' ? 'bg-yellow-500 text-black' : 'bg-gray-700'}`}
              onClick={() => setOrderType('stop')}
            >
              Stop Limit
            </button>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Price</label>
            <input
              type="text"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              className="w-full border-2 border-gray-700 rounded-lg p-3 text-right"
              placeholder="118,108.86 USDT"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Amount</label>
            <input
              type="text"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              className="w-full border-2 border-gray-700 rounded-lg p-3 text-right"
              placeholder="BTC"
            />
          </div>

          <div className="text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Total</span>
              <span>Minimum 5 USDT</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <input type="checkbox" />
            <span>TP/SL</span>
          </div>

          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>Avbl</span>
              <span className="text-yellow-500">0.00000000 USDT ⚠️</span>
            </div>
            <div className="flex justify-between">
              <span>Max Buy</span>
              <span>0 BTC</span>
            </div>
            <div className="flex justify-between">
              <span>Est. Fee</span>
              <span>-</span>
            </div>
          </div>

          <button className="w-full bg-emerald-400 hover:bg-emerald-600 text-white py-3 rounded font-semibold">
            Buy BTC
          </button>
        </div>

        {/* Sell Form */}
        <div className="space-y-4">
          <div className="h-10"></div> {/* Spacer for alignment */}

          <div>
            <label className="block text-sm text-gray-400 mb-1">Price</label>
            <input
              type="text"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              className="w-full border-2 border-gray-700 rounded-lg p-3 text-right"
              placeholder="118,108.86 USDT"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Amount</label>
            <input
              type="text"
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
              className="w-full border-2 border-gray-700 rounded-lg p-3 text-right"
              placeholder="BTC"
            />
          </div>

          <div className="text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Total</span>
              <span>Minimum 5 USDT</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <input type="checkbox" />
            <span>TP/SL</span>
          </div>

          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>Avbl</span>
              <span className="text-yellow-500">0.00000000 BTC ⚠️</span>
            </div>
            <div className="flex justify-between">
              <span>Max Sell</span>
              <span>0 USDT</span>
            </div>
            <div className="flex justify-between">
              <span>Est. Fee</span>
              <span>-</span>
            </div>
          </div>

          <button className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded font-semibold">
            Sell BTC
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
