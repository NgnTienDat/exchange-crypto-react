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
        background: { color: '#1f2937' },
        textColor: '#e5e7eb',
      },
      grid: {
        vertLines: { color: '#374151' },
        horzLines: { color: '#374151' },
      },
      timeScale: {
        borderColor: '#374151',
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
      upColor: '#16a34a',
      downColor: '#dc2626',
      borderVisible: false,
      wickUpColor: '#16a34a',
      wickDownColor: '#dc2626',
    });

    // Cleanup
    return () => {
      if (chartRef.current) {
        chartRef.current.remove(); 
        chartRef.current = null;
        seriesRef.current = null;
      }
    };
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
          <span className="text-lg font-semibold">{productId} • 1D • Binance</span>
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
