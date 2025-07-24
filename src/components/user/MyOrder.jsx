// components/user/MyOrder.jsx
import React from 'react';

const MyOrder = () => {
    return (
        <div className="bg-gray-800 border-t border-gray-700 p-4">
            <div className="flex space-x-6 mb-4">
                <button className="text-yellow-500 border-b-2 border-yellow-500 pb-2">Open Orders(0)</button>
                <button className="text-gray-400 pb-2">Order History</button>
                <button className="text-gray-400 pb-2">Trade History</button>
                <button className="text-gray-400 pb-2">Funds</button>
                <button className="text-gray-400 pb-2">Bots</button>
            </div>

            <div className="text-sm text-gray-400">
                <div className="flex justify-between border-b border-gray-700 pb-2 mb-4">
                    <span>Date</span>
                    <span>Pair</span>
                    <span>Type</span>
                    <span>Side</span>
                    <span>Price</span>
                    <span>Amount</span>
                    <span>Amount per Iceberg Order</span>
                    <span>Filled</span>
                    <span>Total</span>
                    <span>Trigger Conditions</span>
                    <span>SOR</span>
                    <span>TP/SL</span>
                    <span className="text-yellow-500">Cancel All</span>
                </div>
                <div className="text-center py-8 text-gray-500">
                    No open orders
                </div>
            </div>
        </div>
    );
};

export default MyOrder;
