import React, { useState } from "react";

const MyOrder = ({ orders = [] }) => {
  const [activeTab, setActiveTab] = useState("open"); // open | positions | history

  const tabs = [
    { key: "open", label: "Open orders" },
    { key: "positions", label: "Positions" },
    { key: "history", label: "Orders history" }
  ];

  const handleCancelOrder = (id) => {
    console.log("Cancel order", id);
  };

  const handleCancelAll = () => {
    console.log("Cancel all orders");
  };

  return (
    <div className="bg-white rounded-md border shadow-sm">
      {/* Tabs */}
      <div className="flex items-center justify-between border-b px-4 py-2 bg-gray-50">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                activeTab === tab.key
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
              {tab.key === "open" && orders.length > 0 && (
                <span className="ml-1 text-xs bg-gray-300 text-gray-800 px-1.5 rounded">
                  {orders.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Settings + Cancel all */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCancelAll}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel all orders
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-white border-b">
            <tr className="text-gray-500">
              <th className="px-4 py-2 text-left">Symbol</th>
              <th className="px-4 py-2 text-left">Side</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Filled</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No orders
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200 text-gray-700 font-semibold">
                  <td className="px-4 py-2">{order.symbol}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      order.side === "Buy" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {order.side}
                  </td>
                  <td className="px-4 py-2">{order.type}</td>
                  <td className="px-4 py-2 font-medium">
                    {order.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 font-medium">
                    {order.amount.toFixed(8)} <span className="text-gray-500">BTC</span>
                  </td>
                  <td className="px-4 py-2">
                    <div>
                      {order.filled.toFixed(2)} <span className="text-gray-500">BTC</span>
                    </div>
                    <div className="text-xs text-gray-500">{order.percent}%</div>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
