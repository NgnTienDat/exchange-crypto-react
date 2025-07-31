import { useEffect, useState, useCallback } from 'react';
import useSubscribeDepth from '../../hooks/useSubscribeDepth';

const Orderbook2 = ({ productId }) => {
    // console.log("ID: ", productId)
    const [bids, setBids] = useState([]);
    const [asks, setAsks] = useState([]);

    const onDepthUpdate = useCallback((data) => {
        if (!data || typeof data !== 'object') return;

        const updateOrderList = (orders, newOrder) => {
            const updated = [...orders];
            const index = updated.findIndex(order => order.priceLevel === newOrder.priceLevel);

            if (newOrder.quantity === 0) {
                // Xóa nếu quantity = 0
                if (index !== -1) updated.splice(index, 1);
            } else {
                if (index !== -1) {
                    updated[index] = newOrder; // cập nhật lệnh
                } else {
                    updated.push(newOrder); // thêm mới
                }
            }

            // Sắp xếp lại
            return newOrder.side === 'bid'
                ? updated.sort((a, b) => b.priceLevel - a.priceLevel).slice(0, 10)
                : updated.sort((a, b) => a.priceLevel - b.priceLevel).slice(0, 10);
        };

        if (data.side === 'bid') {
            setBids(prev => updateOrderList(prev, data));
        } else if (data.side === 'ask') {
            setAsks(prev => updateOrderList(prev, data));
        }
    }, []);


    useSubscribeDepth(productId, onDepthUpdate);

    return (
        <div className="text-sm bg-black text-white p-2">
            <div className="text-center text-green-400 font-bold mb-2">Sổ lệnh</div>
            <div className="flex justify-between px-1 font-semibold text-red-400">Asks</div>
            <div>
                {asks.map((ask, idx) => (
                    <div key={`ask-${idx}`} className="flex justify-between space-x-3 px-1 text-red-400">
                        <span>{Number(ask.priceLevel).toFixed(2)}</span>
                        <span>{Number(ask.quantity).toFixed(5)}</span>
                    </div>
                ))}
            </div>
            <div className="text-center font-bold text-green-500 mt-2 mb-2">
                {bids[0] && bids[0].priceLevel.toFixed(2)}
            </div>
            <div className="flex justify-between px-1 font-semibold text-green-400">Bids</div>
            <div>
                {bids.map((bid, idx) => (
                    <div key={`bid-${idx}`} className="flex justify-between space-x-3 px-1 text-green-400">
                        <span>{Number(bid.priceLevel).toFixed(2)}</span>
                        <span>{Number(bid.quantity).toFixed(5)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Orderbook2;