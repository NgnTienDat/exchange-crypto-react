// // components/user/CandleChart.jsx
// import React from 'react';
// import { Settings } from 'lucide-react';

// const CandleChart = () => {
//   return (
//     <div className="flex-1 bg-gray-900 p-4">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center space-x-4">
//           <span className="text-lg font-semibold">BTCUSDT • 1D • Binance</span>
//           {/* <span className="text-red-400">O 118756.00 H 119273.36 L 117103.10 C 118401.22</span>
//           <span className="text-red-400">-354.77 (-0.30%)</span> */}
//         </div>
//         <div className="flex items-center space-x-2">
//           <button className="px-3 py-1 bg-gray-700 rounded text-sm">1s</button>
//           <button className="px-3 py-1 bg-gray-700 rounded text-sm">15m</button>
//           <button className="px-3 py-1 bg-gray-700 rounded text-sm">1H</button>
//           <button className="px-3 py-1 bg-gray-700 rounded text-sm">4H</button>
//           <button className="px-3 py-1 bg-yellow-500 text-black rounded text-sm">1D</button>
//           <button className="px-3 py-1 bg-gray-700 rounded text-sm">1W</button>
//           <Settings className="w-4 h-4 text-gray-400 ml-2" />
//         </div>
//       </div>

//       {/* Mock Chart */}
//       <div className="h-96 bg-gray-800 rounded flex items-center justify-center border">
//         <div className="text-center text-gray-400">
//           <div className="w-full h-full flex items-end justify-center space-x-1 p-8">
//             {Array.from({ length: 50 }, (_, i) => (
//               <div
//                 key={i}
//                 className={`w-2 bg-gradient-to-t ${Math.random() > 0.5 ? 'from-green-500 to-green-300' : 'from-red-500 to-red-300'} rounded-sm`}
//                 style={{ height: `${Math.random() * 100 + 20}%` }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CandleChart;
// components/user/CandleChart.jsx
// components/user/CandleChart.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Settings } from 'lucide-react';
import { createChart } from 'lightweight-charts';
import useSubscribeKline from '../../hooks/useSubscribeKline';

const CandleChart = ({ productId }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const [klineData, setKlineData] = useState(null);

  // Subscribe realtime Kline
  useSubscribeKline(productId, (data) => {
    setKlineData(data);
  });

  // Khởi tạo biểu đồ
  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { color: '#1f2937' }, // gray-800
        textColor: '#e5e7eb', // gray-200
      },
      grid: {
        vertLines: { color: '#374151' }, // gray-700
        horzLines: { color: '#374151' },
      },
      timeScale: {
        borderColor: '#374151', // gray-600
        timeVisible: true,
        secondsVisible: true,
      },
      priceScale: {
        borderColor: '#374151',
      },
      crosshair: {
        mode: 0,
      },
    });

    seriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: '#16a34a',       // green-600
      downColor: '#dc2626',     // red-600
      borderVisible: false,
      wickUpColor: '#16a34a',
      wickDownColor: '#dc2626',
    });

    // Cleanup
    return () => chartRef.current.remove();
  }, []);

  // Realtime update
  useEffect(() => {
    if (!klineData || !seriesRef.current) return;

    const candle = {
      time: Math.floor(klineData.timestamp / 1000), // convert to seconds
      open: klineData.open,
      high: klineData.high,
      low: klineData.low,
      close: klineData.close,
    };

    seriesRef.current.update(candle);
  }, [klineData]);

  return (
    <div className="flex-1 bg-neutral-800 rounded p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold">BTCUSDT • 1D • Binance</span>
          {/* Có thể hiển thị O/H/L/C ở đây nếu muốn */}
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-gray-700 rounded text-sm">1s</button>
          <button className="px-3 py-1 bg-gray-700 rounded text-sm">15m</button>
          <button className="px-3 py-1 bg-gray-700 rounded text-sm">1H</button>
          <button className="px-3 py-1 bg-gray-700 rounded text-sm">4H</button>
          <button className="px-3 py-1 bg-yellow-500 text-black rounded text-sm">1D</button>
          <button className="px-3 py-1 bg-gray-700 rounded text-sm">1W</button>
          <Settings className="w-4 h-4 text-gray-400 ml-2" />
        </div>
      </div>

      {/* Biểu đồ thực tế */}
      <div
        ref={chartContainerRef}
        className="h-96 border border-gray-600"
      />
    </div>
  );
};

export default CandleChart;

//  <div className="flex-1 bg-gray-900 p-4">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center space-x-4">
//           <span className="text-lg font-semibold">BTCUSDT • 1D • Binance</span>
//           
//         </div>
//         <div className="flex items-center space-x-2">
//           <button className="px-3 py-1 bg-gray-700 rounded text-sm">1s</button>
//           <button className="px-3 py-1 bg-gray-700 rounded text-sm">15m</button>
//           <button className="px-3 py-1 bg-gray-700 rounded text-sm">1H</button>
//           <button className="px-3 py-1 bg-gray-700 rounded text-sm">4H</button>
//           <button className="px-3 py-1 bg-yellow-500 text-black rounded text-sm">1D</button>
//           <button className="px-3 py-1 bg-gray-700 rounded text-sm">1W</button>
//           <Settings className="w-4 h-4 text-gray-400 ml-2" />
//         </div>
//       </div>

//       {/* Mock Chart */}
//       <div className="h-96 bg-gray-800 rounded flex items-center justify-center border">
//         <div className="text-center text-gray-400">
//           <div className="w-full h-full flex items-end justify-center space-x-1 p-8">
//             {Array.from({ length: 50 }, (_, i) => (
//               <div
//                 key={i}
//                 className={`w-2 bg-gradient-to-t ${Math.random() > 0.5 ? 'from-green-500 to-green-300' : 'from-red-500 to-red-300'} rounded-sm`}
//                 style={{ height: `${Math.random() * 100 + 20}%` }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>