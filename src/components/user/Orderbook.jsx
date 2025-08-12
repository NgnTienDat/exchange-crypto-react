import { MoreHorizontal, TrendingUp } from 'lucide-react';
import useMarketData from '../../hooks/useMarketData';
import useCellHighlights from '../../hooks/useHighlightChange';

const Orderbook = ({ sellOrders, buyOrders, productId }) => {
  const data = useMarketData(productId);
  const sellHighlights = useCellHighlights(sellOrders);
  const buyHighlights = useCellHighlights(buyOrders);

  if (!data) return null;
  const { price } = data;

  const renderRow = (order, isBuy) => {
    const highlights = isBuy ? buyHighlights[order.price] : sellHighlights[order.price];
    const color = isBuy ? 'green' : 'red';

    return (
      <div
        key={order.price}
        className={`grid grid-cols-[2fr_1fr_1fr] gap-2 text-${color}-400 font-bold p-1 rounded hover:bg-gray-700`}
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Order Book</h3>
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </div>

        <div className="space-y-1 text-xs">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 text-gray-400 pb-2">
            <span>Price (USDT)</span>
            <span>Amount (BTC)</span>
            <span>Total</span>
          </div>

          {/* Sell Orders */}
          {sellOrders.slice(-15).map(order => renderRow(order, false))}

          {/* Current Price */}
          <div className="flex justify-between items-center py-3 border-y border-gray-600">
            <span className="text-green-400 font-bold">{price.toLocaleString()}</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>

          {/* Buy Orders */}
          {buyOrders.slice(-15).map(order => renderRow(order, true))}
        </div>
      </div>
    </div>
  );
};

export default Orderbook;
