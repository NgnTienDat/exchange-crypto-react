import { MoreHorizontal, TrendingDown, TrendingUp } from 'lucide-react';
import useMarketData from '../../hooks/useMarketData';
import useCellHighlights from '../../hooks/useHighlightChange';
import useSubscribeMarketTrade from '../../hooks/useSubscribeMarketTrade';
import { useState } from 'react';

const Orderbook = ({ sellOrders, buyOrders, productId }) => {
  const data = useMarketData(productId);
  // console.log("PRODUCT: ", productId)
  const sellHighlights = useCellHighlights(sellOrders);
  const buyHighlights = useCellHighlights(buyOrders);
  const [recentTrade, setRecentTrade] = useState(null);


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

    // console.log("Recent: ", newTrade)

    setRecentTrade(newTrade);
  });
  if (!data) return null;
  const { price } = data;

  const renderRow = (order, isBuy) => {
    const highlights = isBuy ? buyHighlights[order.price] : sellHighlights[order.price];
    const color = isBuy ? 'green' : 'red';

    return (
      <div
        key={order.price}
        className={`grid grid-cols-[2fr_1fr_1fr] gap-2 text-${color}-400 font-bold p-1 rounded hover:bg-gray-200`}
      >

        <span className={`${highlights?.price ? `bg-${color}-900/40 transition-all` : ''} `}>
          {order.price.toFixed(2)}
        </span>
        <span className={`${highlights?.amount ? `bg-${color}-900/40 transition-all` : ''} text-gray-700`}>

          {order.amount.toFixed(5)}
        </span>
        <span className={`text-right ${highlights?.total ? `bg-${color}-900/40 transition-all` : ''} text-gray-700`}>

          {(order.total / 1000).toFixed(2)}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-b">
      <div className="p-4">
        

        <div className="space-y-1 text-xs">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 text-gray-500 pb-2">
            <span>Price (USDT)</span>
            <span>Amount (BTC)</span>
            <span className='text-right'>Total</span>
          </div>

          {/* Sell Orders */}
          {sellOrders.slice(-12).map(order => renderRow(order, false))}

          {/* Current Price */}
          <div className="flex justify-between items-center py-1 border-y border-gray-300">
            {recentTrade && (
              <>
                <div
                  className={`flex justify-between font-bold ${recentTrade.type === 'buy' ? 'text-green-500' : 'text-red-500'
                    } hover:bg-gray-700 p-1 rounded transition-all duration-150 ease-in-out`}
                >
                  <span className="text-lg">
                    {new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(recentTrade.price)}
                  </span>
                </div>

                {recentTrade.type === 'buy' ? (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-rose-600" />
                )}
              </>
            )}
          </div>


          {/* Buy Orders */}
          {buyOrders.slice(-12).map(order => renderRow(order, true))}
        </div>
      </div>
    </div>
  );
};

export default Orderbook;
