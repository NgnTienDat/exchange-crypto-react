import React, { useEffect, useState } from "react";
import useOrder from "../../hooks/useOrder";



const MyOrder = ({ pair }) => {
  const [openPage, setOpenPage] = useState(0);
  const [historyPage, setHistoryPage] = useState(0);
  
  const {
    openOrders, orderHistory,
    historyPagination, openPagination,
    openLoading, historyLoading
  } = useOrder(pair, openPage, historyPage, 7);

  const [activeTab, setActiveTab] = useState("open");
  const tabs = [
    { key: "open", label: "Open orders" },
    { key: "positions", label: "Positions" },
    { key: "history", label: "Orders history" }
  ];

  const getCurrentOrders = () => {
    switch (activeTab) {
      case "open":
        return openOrders ?? [];
      case "history":
        return orderHistory ?? [];
      default:
        return [];
    }
  };

  const currentOrders = getCurrentOrders();
  const isOperationInProgress = historyLoading || openLoading;

  return (
    <div className="bg-white rounded-md border shadow-sm h-[51vh]">
      {/* Tabs */}
      <div className="flex items-center justify-between rounded-md border-b px-4 py-2 bg-gray-50">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${activeTab === tab.key
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {tab.label}
              {tab.key === "open" && openOrders?.length > 0 &&
                <span className="ml-1 text-xs bg-gray-300 text-gray-800 px-1.5 rounded">
                  {openOrders.length}
                </span>

              }
            </button>
          ))}
        </div>

        {/* Cancel all */}
        <div className="flex items-center space-x-2">
          {activeTab === "open" && (
            <button
              onClick={() => console.log("Cancel all orders")}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cancel all orders
            </button>
          )}
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
              <th className="px-7 py-2 text-left">
                {activeTab === 'history' ? 'Status' : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders?.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No orders
                </td>
              </tr>
            ) : (
              currentOrders?.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 text-gray-700 text-[13px] font-semibold"
                >
                  <td className="px-4 py-2">{order.pairId}</td>
                  <td
                    className={`px-4 py-2 font-medium ${order.side === "BID" ? "text-green-500" : "text-red-500"
                      }`}
                  >
                    {order.side === "BID" ? "Buy" : "Sell"}
                  </td>
                  <td className="px-4 py-2">{order.type}</td>
                  <td className="px-4 py-2 font-medium">
                    {order.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 font-medium">
                    {order.quantity.toFixed(8)}{" "}
                    <span className="text-gray-500">BTC</span>
                  </td>
                  <td className="px-4 py-2">
                    <div>
                      {order.filledQuantity.toFixed(2)}{" "}
                      <span className="text-gray-500">BTC</span>
                    </div>
                  </td>
                  {activeTab === 'history' ?
                    <td className="px-4 py-2 text-left">{order.status}</td>
                    :
                    <td className="px-4 py-2">
                      {activeTab === "open" && (
                        <button
                          onClick={() => console.log("Cancel order", order.id)}
                          className="text-blue-500 hover:underline text-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  }

                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Pagination controls */}

        {activeTab === 'history' ?
          <div className="flex my-3 space-x-5 justify-center items-center">
            <button
              disabled={historyPage === 0 || isOperationInProgress}
              onClick={() => setHistoryPage((p) => p - 1)}
              className="px-3 py-1 rounded disabled:opacity-50 text-gray-600 cursor-pointer hover:bg-gray-300"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {historyPagination.page + 1}
            </span>
            <button
              disabled={!historyPagination.hasNext || isOperationInProgress}
              onClick={() => setHistoryPage((p) => p + 1)}
              className="px-3 py-1 rounded disabled:opacity-50 text-gray-600 cursor-pointer hover:bg-gray-300"
            >
              Next
            </button>
          </div>
          :
          <div className="flex my-3 space-x-5 justify-center items-center">
            <button
              disabled={openPage === 0 || isOperationInProgress}
              onClick={() => setOpenPage((p) => p - 1)}
              className="px-3 py-1 rounded disabled:opacity-50 text-gray-600 cursor-pointer hover:bg-gray-300"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {openPagination.page + 1}
            </span>
            <button
              disabled={!openPagination.hasNext || isOperationInProgress}
              onClick={() => setOpenPage((p) => p + 1)}
              className="px-3 py-1 rounded disabled:opacity-50 text-gray-600 cursor-pointer hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        }

      </div>
    </div>
  );
};

export default MyOrder