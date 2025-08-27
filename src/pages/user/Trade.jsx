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
import { getOpenOrdersByPairId, getOrderHistoryByPairId } from '../../services/orderService';
import useUser from '../../hooks/useUser';

const Trade = () => {
  const { productId } = useParams();
  const pairId = productId.replace('-', '')
  const [activeView, setActiveView] = useState("orderbook");
  const { openTradeDetail, closeTradeDetail } = useTrade();
  const { user } = useUser();
  useNotification(user?.id);


  useEffect(() => {
    if (!user) return;

    getOpenOrdersByPairId(productId);
    getOrderHistoryByPairId(productId);

  }, [user, productId]);

  useEffect(() => {

    if (productId) {
      openTradeDetail(pairId);
    }

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

          {/* {activeView === "orderbook" ? (
            <Orderbook
              productId={pairId}
            />
          ) : (
            <TradeSidebar productId={pairId} />
          )} */}
        </div>

        <div className="w-[54%] space-y-1">

          <TradingViewWidget productId={pairId} />
          <MyOrder pair={productId} />


        </div>
        <div className='w-[23%] space-y-1'>

          <OrderForm
            pair={productId}
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

