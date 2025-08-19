import React from "react";
import { ArrowUpDown } from "lucide-react";
import useOrderHistory from "../../../hooks/useOrderHistory";
import { formatDate, formatNumber } from "../../../utils/helper";

const OrderHistory = () => {

  const { orders } = useOrderHistory()

  console.log("orders all: ", orders)

  if (!orders) return <div className="bg-white rounded-2xl p-5 shadow">No data to show</div>






  return (
    <div className="p-5 m-5 text-black">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Order History</h2>
        <button className="px-3 py-1 border rounded-md text-sm text-gray-600 hover:bg-gray-100">
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto font-semibold">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="border-b border-gray-200 text-gray-400 text-sm">
            <tr>
              <th className="py-4 px-5">
                Pair <ArrowUpDown size={14} className="inline ml-1" />
              </th>

              <th className="py-2 px-3">
                Side <ArrowUpDown size={14} className="inline ml-1" />
              </th>
              <th className="py-2 px-3">
                Amount <ArrowUpDown size={14} className="inline ml-1" />
              </th>
              <th className="py-2 px-3">
                Price <ArrowUpDown size={14} className="inline ml-1" />
              </th>
              <th className="py-2 px-3">
                Total <ArrowUpDown size={14} className="inline ml-1" />
              </th>
              <th className="py-2 px-3">
                Date <ArrowUpDown size={14} className="inline ml-1" />
              </th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-black">
            {orders?.map((order, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition"
              >
                <td className="p-7 font-medium">
                  {order.pairId}
                </td>

                <td
                  className={`py-3 px-3 font-medium ${order.side === "BID" ? "text-green-500" : "text-red-500"
                    }`}
                >
                  {order.side === 'BID' ? "Buy" : "Sell"}
                </td>
                <td className="py-3 px-5">
                  {order.quantity} {order.pairId.split("-")[0]}
                </td>

                <td className="py-3 px-3">{formatNumber(order.price)} USDT</td>
                <td className="py-3 px-3">{(order.price * order.quantity).toLocaleString()} USDT</td>
                <td className="py-3 px-3">{formatDate(order.createdAt)}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;