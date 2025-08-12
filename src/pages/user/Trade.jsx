import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Star, Search, Settings, MoreHorizontal } from 'lucide-react';
import TradeHeader from '../../components/user/TradeHeader';
import MyOrder from '../../components/user/MyOrder';
import TradeSidebar from '../../components/user/TradeSidebar';
import OrderForm from '../../components/user/OrderForm';
import CandleChart from '../../components/user/CandleChart';
import Orderbook from '../../components/user/Orderbook';
import useSocket from '../../hooks/useSocket';
import useTrade from '../../hooks/useTrade';
import useSubscribeDepth from '../../hooks/useSubscribeDepth';
import { useParams } from 'react-router-dom';
import useSubscribeKline from '../../hooks/useSubscribeKline';
import useMyAsset from '../../hooks/useMyAsset';
import TradingViewWidget from './TradingViewWidget';

const Trade = () => {
  const { productId } = useParams();
  const [currentPrice, setCurrentPrice] = useState(118401.22);
  const [priceChange, setPriceChange] = useState(-354.77);
  const [orderType, setOrderType] = useState('limit');
  const [buyAmount, setBuyAmount] = useState('');
  const [activeView, setActiveView] = useState("orderbook");
  const [sellAmount, setSellAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState('118108.86');
  const [sellPrice, setSellPrice] = useState('118108.86');
  const [sellOrders, setSellOrders] = useState([]);
  const [buyOrders, setBuyOrders] = useState([]);

  const { openTradeDetail, isLoading } = useTrade();
  const sampleOrders = [
    {
      id: 1,
      symbol: "BTC / USDT",
      side: "Buy",
      type: "Limit",
      price: 119000,
      amount: 0.00010,
      filled: 0.00,
      percent: 0.00
    },
    {
      id: 2,
      symbol: "BTC / USDT",
      side: "Sell",
      type: "Limit",
      price: 120000,
      amount: 0.00010,
      filled: 0.00,
      percent: 0.00
    }
  ];


  useSubscribeDepth(productId, (data) => {

    const { productId, bids, asks } = data;

    const newBuyOrders = bids.map(({ priceLevel, quantity }) => ({
      price: parseFloat(priceLevel),
      amount: parseFloat(quantity),
      total: parseFloat(priceLevel) * parseFloat(quantity),
    })).sort((a, b) => b.price - a.price); // giá giảm dần (từ trên xuống)

    const newSellOrders = asks.map(({ priceLevel, quantity }) => ({
      price: parseFloat(priceLevel),
      amount: parseFloat(quantity),
      total: parseFloat(priceLevel) * parseFloat(quantity),
    })).sort((a, b) => b.price - a.price); // giá giảm dần (từ trên xuống)



    setBuyOrders(newBuyOrders);
    setSellOrders(newSellOrders);

  });


  useEffect(() => {
    if (productId) {
      openTradeDetail(productId);
    }
  }, [openTradeDetail, productId]);

  return (
    <div className="min-h-screen w-[99%] text-white p-1">
      <TradeHeader productId={productId} />
      <div className="flex space-x-1 py-1">
        <div className="w-[23%] rounded">
          <div className="flex justify-center space-x-1 pt-2 bg-white text-black font-semibold rounded-t-lg">
            <button
              onClick={() => setActiveView("orderbook")}
              className={`py-1 px-2 rounded-md ${activeView === "orderbook" ? "bg-gray-300 text-gray-700" : "bg-white"
                }`}
            >
              Order book
            </button>
            <button
              onClick={() => setActiveView("recentTrades")}
              className={`py-1 px-2 rounded-md ${activeView === "recentTrades" ? "bg-gray-300 text-gray-700" : "bg-white"
                }`}
            >
              Recent trades
            </button>
          </div>

          {activeView === "orderbook" ? (
            <Orderbook
              sellOrders={sellOrders}
              buyOrders={buyOrders}
              productId={productId}
            />
          ) : (
            <TradeSidebar
              recentTrades={[]}
              tradingPairs={[]}
              productId={productId}
            />
          )}
        </div>

        <div className="w-[54%] space-y-1">
          {/* <CandleChart productId={productId} /> */}
          {/* <TradingViewWidget /> */}
          <TradingViewWidget productId={productId} />
          <MyOrder orders={sampleOrders}/>

          {/* <OrderForm
            orderType={orderType}
            setOrderType={setOrderType}
            buyAmount={buyAmount}
            setBuyAmount={setBuyAmount}
            sellAmount={sellAmount}
            setSellAmount={setSellAmount}
            buyPrice={buyPrice}
            setBuyPrice={setBuyPrice}
            sellPrice={sellPrice}
            setSellPrice={setSellPrice}
          /> */}
        </div>
        <div className='w-[23%]'>

          <OrderForm
            orderType={orderType}
            setOrderType={setOrderType}
            buyAmount={buyAmount}
            setBuyAmount={setBuyAmount}
            sellAmount={sellAmount}
            setSellAmount={setSellAmount}
            buyPrice={buyPrice}
            setBuyPrice={setBuyPrice}
            sellPrice={sellPrice}
            setSellPrice={setSellPrice}
          />
        </div>
      </div>
      <div className='w-[99.7%]'>
      </div>
    </div>
  );
};

export default Trade;

