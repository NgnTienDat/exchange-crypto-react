// import React, { useState, useEffect } from 'react';
// import { TrendingUp, TrendingDown, Star, Search, Settings, MoreHorizontal } from 'lucide-react';
// import TradeHeader from '../../components/user/TradeHeader';
// import MyOrder from '../../components/user/MyOrder';
// import TradeSidebar from '../../components/user/TradeSidebar';
// import OrderForm from '../../components/user/OrderForm';
// import CandleChart from '../../components/user/CandleChart';
// import Orderbook from '../../components/user/Orderbook';
// import useSocket from '../../hooks/useSocket';

// const Trade = () => {





//   const [currentPrice, setCurrentPrice] = useState(118401.22);
//   const [priceChange, setPriceChange] = useState(-354.77);
//   const [orderType, setOrderType] = useState('limit');
//   const [buyAmount, setBuyAmount] = useState('');
//   const [sellAmount, setSellAmount] = useState('');
//   const [buyPrice, setBuyPrice] = useState('118108.86');
//   const [sellPrice, setSellPrice] = useState('118108.86');

//   // Mock order book data
//   const sellOrders = [
//     { price: 118407.36, amount: 0.00005, total: 5.92037 },
//     { price: 118407.18, amount: 0.00005, total: 5.92036 },
//     { price: 118407.16, amount: 0.65864, total: 77.99 },
//     { price: 118407.15, amount: 0.00010, total: 11.8407 },
//     { price: 118406.90, amount: 0.00005, total: 5.92035 },
//     { price: 118404.96, amount: 0.06363, total: 7.531 },
//     { price: 118404.82, amount: 0.00018, total: 21.3128 },
//     { price: 118404.00, amount: 0.27860, total: 32.99 },
//     { price: 118403.59, amount: 0.00050, total: 59.2018 },
//     { price: 118403.33, amount: 0.29190, total: 34.56 }
//   ];

//   const buyOrders = [
//     { price: 118401.22, amount: 11.85444, total: 1.40 },
//     { price: 118401.21, amount: 0.99445, total: 117.74 },
//     { price: 118401.20, amount: 0.00010, total: 11.8401 },
//     { price: 118355.05, amount: 0.00005, total: 5.91775 },
//     { price: 118354.74, amount: 0.00050, total: 59.1774 },
//     { price: 118352.37, amount: 4.68000, total: 553.89 }
//   ];

//   // Mock trading pairs
//   const tradingPairs = [
//     { pair: 'ACX/USDT', price: 0.1831, change: -3.58, volume: '5x' },
//     { pair: 'ADA/USDT', price: 0.8004, change: -7.10, volume: '10x' },
//     { pair: 'ADX/USDT', price: 0.1022, change: -5.02, volume: '5x' },
//     { pair: 'AEUR/USDT', price: 1.1235, change: -2.71, volume: '5x' },
//     { pair: 'AEVO/USDT', price: 0.1017, change: -10.48, volume: '5x' },
//     { pair: 'AGLD/USDT', price: 0.775, change: -10.92, volume: '5x' },
//     { pair: 'AI/USDT', price: 0.1297, change: -12.31, volume: '5x' }
//   ];

//   // Mock recent trades
//   const recentTrades = [
//     { price: 118401.22, amount: 0.00279, time: '18:04:46', type: 'buy' },
//     { price: 118401.21, amount: 0.00024, time: '18:04:46', type: 'sell' },
//     { price: 118401.22, amount: 0.00016, time: '18:04:46', type: 'buy' },
//     { price: 118401.22, amount: 0.00085, time: '18:04:46', type: 'buy' },
//     { price: 118401.22, amount: 0.00012, time: '18:04:45', type: 'sell' },
//     { price: 118401.21, amount: 0.00073, time: '18:04:45', type: 'buy' }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <TradeHeader currentPrice={currentPrice} priceChange={priceChange} />

//       <div className="flex">
//         <Orderbook sellOrders={sellOrders} buyOrders={buyOrders} currentPrice={currentPrice} />

//         <div className="flex-1 flex flex-col">
//           <CandleChart />

//           <OrderForm
//             orderType={orderType}
//             setOrderType={setOrderType}
//             buyAmount={buyAmount}
//             setBuyAmount={setBuyAmount}
//             sellAmount={sellAmount}
//             setSellAmount={setSellAmount}
//             buyPrice={buyPrice}
//             setBuyPrice={setBuyPrice}
//             sellPrice={sellPrice}
//             setSellPrice={setSellPrice}
//           />


//         </div>

//         <TradeSidebar recentTrades={recentTrades} tradingPairs={tradingPairs} />
//       </div>

//       <MyOrder />
//     </div>
//   );
// };

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

const Trade = () => {
  const { productId } = useParams();
  const [currentPrice, setCurrentPrice] = useState(118401.22);
  const [priceChange, setPriceChange] = useState(-354.77);
  const [orderType, setOrderType] = useState('limit');
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState('118108.86');
  const [sellPrice, setSellPrice] = useState('118108.86');
  const [sellOrders, setSellOrders] = useState([]);
  const [buyOrders, setBuyOrders] = useState([]);

  const { openTradeDetail, isLoading } = useTrade();

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
    <div className="min-h-screen  text-white">
      <TradeHeader productId={productId} />
      <div className="flex space-x-1 p-1">
        <div className='w-[23%] bg-neutral-800 rounded'>
          <Orderbook sellOrders={sellOrders} buyOrders={buyOrders} productId={productId} />
        </div>
        <div className="w-[54%] space-y-1">
          <CandleChart productId={productId} />
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
        <div className='w-[23%]'>

          <TradeSidebar recentTrades={[]} tradingPairs={[]} />
        </div>
      </div>
      <MyOrder />
    </div>
  );
};

export default Trade;


// import React, { useState, useEffect } from 'react';
// import { TrendingUp, TrendingDown, Star, Search, Settings, MoreHorizontal } from 'lucide-react';
// import TradeHeader from '../../components/user/TradeHeader';
// import MyOrder from '../../components/user/MyOrder';
// import TradeSidebar from '../../components/user/TradeSidebar';
// import OrderForm from '../../components/user/OrderForm';
// import CandleChart from '../../components/user/CandleChart';
// import Orderbook from '../../components/user/Orderbook';
// import useSocket from '../../hooks/useSocket';
// import useTrade from '../../hooks/useTrade';
// import useSubscribeDepth from '../../hooks/useSubscribeDepth';
// import { useParams } from 'react-router-dom';
// import Orderbook2 from '../../components/user/OrderBook2';

// const Trade = () => {
//   const { productId } = useParams();
//   const [currentPrice, setCurrentPrice] = useState(118401.22);
//   const [priceChange, setPriceChange] = useState(-354.77);
//   const [orderType, setOrderType] = useState('limit');
//   const [buyAmount, setBuyAmount] = useState('');
//   const [sellAmount, setSellAmount] = useState('');
//   const [buyPrice, setBuyPrice] = useState('118108.86');
//   const [sellPrice, setSellPrice] = useState('118108.86');
//   const [sellOrders, setSellOrders] = useState([]);
//   const [buyOrders, setBuyOrders] = useState([]);

//   const { openTradeDetail, isLoading } = useTrade();

//   // useSubscribeDepth(productId, (data) => {
//   //   const { productId, side, priceLevel, quantity } = data;

//   //   const total = priceLevel * quantity;

//   //   if (side === 'ask') {
//   //     console.log("data p: ", data)
//   //     setSellOrders((prevOrders) => {
//   //       const existingOrderIndex = prevOrders.findIndex(order => order.price === priceLevel);
//   //       if (existingOrderIndex >= 0) {
//   //         const updatedOrders = [...prevOrders];
//   //         updatedOrders[existingOrderIndex] = { price: priceLevel, amount: quantity, total };
//   //         return updatedOrders;
//   //       } else {
//   //         return [...prevOrders, { price: priceLevel, amount: quantity, total }].sort((a, b) => b.price - a.price);
//   //       }
//   //     });

//   //   } else if (side === 'bid') {
//   //     setBuyOrders((prevOrders) => {
//   //       const existingOrderIndex = prevOrders.findIndex(order => order.price === priceLevel);
//   //       if (existingOrderIndex >= 0) {
//   //         const updatedOrders = [...prevOrders];
//   //         updatedOrders[existingOrderIndex] = { price: priceLevel, amount: quantity, total };
//   //         return updatedOrders;
//   //       } else {
//   //         return [...prevOrders, { price: priceLevel, amount: quantity, total }].sort((a, b) => b.price - a.price);
//   //       }
//   //     });
//   //   }
//   // });


//   useSubscribeDepth(productId, (data) => {
//     const { productId, side, priceLevel, quantity } = data;
//     const total = priceLevel * quantity;

//     const newOrder = { price: priceLevel, amount: quantity, total };

//     if (side === 'ask') {
//       setSellOrders(prevOrders => [...prevOrders, newOrder]); // chỉ thêm vào
//     } else if (side === 'bid') {
//       setBuyOrders(prevOrders => [...prevOrders, newOrder]); // chỉ thêm vào
//     }
//   });

//   useEffect(() => {
//     openTradeDetail(productId);
//   }, [openTradeDetail]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <TradeHeader currentPrice={currentPrice} priceChange={priceChange} />

//       <div className="flex">
//         <Orderbook sellOrders={sellOrders} buyOrders={buyOrders} productId={productId} />

//         <div className="flex-1 flex flex-col">
//           <CandleChart />

//           <OrderForm
//             orderType={orderType}
//             setOrderType={setOrderType}
//             buyAmount={buyAmount}
//             setBuyAmount={setBuyAmount}
//             sellAmount={sellAmount}
//             setSellAmount={setSellAmount}
//             buyPrice={buyPrice}
//             setBuyPrice={setBuyPrice}
//             sellPrice={sellPrice}
//             setSellPrice={setSellPrice}
//           />
//         </div>

//         <TradeSidebar recentTrades={[]} tradingPairs={[]} /> {/* Mock data can be updated similarly */}
//       </div>

//       <MyOrder />
//     </div>
//   );
// };

// export default Trade;