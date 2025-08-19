import { useState } from 'react';
import { ChevronDown, MoreHorizontal, Settings } from 'lucide-react';
import useMarketData from '../../hooks/useMarketData';

const TradeHeader = ({ productId }) => {
  const data = useMarketData(productId);

  if (!data) return null;

  const {
    productId: pair,
    price,
    priceChangePercent24h,
    high24h,
    low24h,
    volume24h,
    trend
  } = data;

  // Format the data for display
  const currentPrice = price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00';
  const changePercent = priceChangePercent24h ? `${priceChangePercent24h.toFixed(3)}%` : '0.000%';
  const formattedHigh24h = high24h?.toLocaleString('en-US', { maximumFractionDigits: 2 }) || '0';
  const formattedLow24h = low24h?.toLocaleString('en-US', { maximumFractionDigits: 2 }) || '0';
  const formattedVolume24h = volume24h?.toLocaleString('en-US', { maximumFractionDigits: 5 }) || '0';

  const isPositive = priceChangePercent24h > 0;

  return (
    <div className="bg-white border-b border-gray-200 px-5 py-3">
      <div className="flex items-center justify-between">
        {/* Left section - Pair selector and price */}
        <div className="flex items-center space-x-10">
          {/* Pair selector */}
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-2 border-r p-2 border-gray-300 ">
              <div className="size-8 bg-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">{pair.charAt(0)}</span>
              </div>
              <button className="flex items-center space-x-1 hover:bg-gray-50 px-2 py-1 rounded">
                <span className="font-medium text-gray-900">{pair || 'BTC-USDT'}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Price and change */}
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">{currentPrice}</span>
              </div>
            </div>
          </div>

          <div className='flex items-center space-x-6 font-semibold'>
            {/* 24h Change */}
            <div className="flex flex-col">
              <div className="text-xs text-gray-500 mb-1">24H change</div>
              <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <span className="font-medium">{changePercent}</span>
              </div>
            </div>

            {/* 24h High */}
            <div className="flex flex-col">
              <div className="text-xs text-gray-500 mb-1">24H High</div>
              <div className="font-medium text-gray-900">{formattedHigh24h}</div>
            </div>

            {/* 24h Low */}
            <div className="flex flex-col">
              <div className="text-xs text-gray-500 mb-1">24H Low</div>
              <div className="font-medium text-gray-900">{formattedLow24h}</div>
            </div>

            {/* 24h Volume */}
            <div className="flex flex-col">
              <div className="text-xs text-gray-500 mb-1">24H Volume (BTC)</div>
              <div className="font-medium text-gray-900">{formattedVolume24h}</div>
            </div>

            {/* Trend indicator (optional) */}
            {trend && (
              <div className="flex flex-col">
                <div className="text-xs text-gray-500 mb-1">Trend</div>
                <div className={`font-medium uppercase ${trend === 'UP' ? 'text-green-600' : 'text-red-600'}`}>
                  {trend}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right section - Action buttons */}
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeHeader;

