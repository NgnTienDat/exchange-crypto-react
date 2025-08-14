import React, { useState, useEffect } from 'react';
import TradeHeader from '../../components/user/TradeHeader';
import MyOrder from '../../components/user/MyOrder';
import TradeSidebar from '../../components/user/TradeSidebar';
import OrderForm from '../../components/user/OrderForm';
import Orderbook from '../../components/user/Orderbook';
import useTrade from '../../hooks/useTrade';
import { useParams } from 'react-router-dom';
import TradingViewWidget from './TradingViewWidget';
import MyBalance from '../../components/user/MyBalance';
import useNotification from '../../hooks/useNotification';

const Trade = () => {
  const { productId } = useParams();
  const pairId = productId.replace('-', '')

  const [orderType, setOrderType] = useState('limit');
  const [buyAmount, setBuyAmount] = useState('');
  const [activeView, setActiveView] = useState("orderbook");
  const [sellAmount, setSellAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState('118108.86');
  const [sellPrice, setSellPrice] = useState('118108.86');

  const { openTradeDetail, closeTradeDetail } = useTrade();
  useNotification(productId);
  // const renderCount = React.useRef(0);
  // renderCount.current += 1;
  // console.log("render count:", renderCount.current);



  useEffect(() => {
    if (productId) {
      openTradeDetail(pairId);
    }
  }, [pairId]); 

  useEffect(() => {
    const handleBeforeUnload = () => {
      closeTradeDetail(pairId);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pairId]);



  return (
    <div className="min-h-screen w-[99%] text-white p-1">
      <TradeHeader productId={pairId} />
      <div className="flex space-x-1 py-1">
        <div className="w-[23%] rounded">
          <div className="flex justify-center text-sm space-x-1 pt-2 bg-white text-black font-semibold rounded-t-lg">
            <button
              onClick={() => setActiveView("orderbook")}
              className={`py-1 px-4 rounded-md ${activeView === "orderbook" ? "bg-gray-300 text-gray-700" : "bg-white"
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
              // sellOrders={sellOrders}
              // buyOrders={buyOrders}
              productId={pairId}
            />
          ) : (
            <TradeSidebar
              recentTrades={[]}
              tradingPairs={[]}
              productId={pairId}
            />
          )}
        </div>

        <div className="w-[54%] space-y-1">

          <TradingViewWidget productId={pairId} />
          <MyOrder pair={productId} />


        </div>
        <div className='w-[23%] space-y-1'>

          <OrderForm
            pair={productId}
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

          <MyBalance />
        </div>
      </div>
      <div className='w-[99.7%]'>
      </div>
    </div>
  );
};

export default Trade;

