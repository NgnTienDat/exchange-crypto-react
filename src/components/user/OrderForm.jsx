// // components/user/OrderForm.jsx
// import React from 'react';

// const OrderForm = ({
//   orderType, setOrderType,
//   buyAmount, setBuyAmount,
//   sellAmount, setSellAmount,
//   buyPrice, setBuyPrice,
//   sellPrice, setSellPrice
// }) => {
//   const handleOrderTypeChange = (type) => {
//     setOrderType(type);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (orderType === 'buy') {
//       console.log('Mua:', { amount: buyAmount, price: buyPrice });
//     } else {
//       console.log('Bán:', { amount: sellAmount, price: sellPrice });
//     }
//   };

//   return (
//     <div className="bg-white rounded p-4">
//       <div className="grid grid-cols-2 gap-4">
//         {/* Buy Form */}
//         <div className="space-y-4">
//           <div className="flex space-x-2 mb-4">
//             <button
//               className={`px-4 py-2 text-sm rounded ${orderType === 'limit' ? 'bg-yellow-500 text-black' : 'bg-gray-700'}`}
//               onClick={() => setOrderType('limit')}
//             >
//               Limit
//             </button>
//             <button
//               className={`px-4 py-2 text-sm rounded ${orderType === 'market' ? 'bg-yellow-500 text-black' : 'bg-gray-700'}`}
//               onClick={() => setOrderType('market')}
//             >
//               Market
//             </button>
//             <button
//               className={`px-4 py-2 text-sm rounded ${orderType === 'stop' ? 'bg-yellow-500 text-black' : 'bg-gray-700'}`}
//               onClick={() => setOrderType('stop')}
//             >
//               Stop Limit
//             </button>
//           </div>

//           <div>
//             <label className="block text-sm text-gray-400 mb-1">Price</label>
//             <input
//               type="text"
//               value={buyPrice}
//               onChange={(e) => setBuyPrice(e.target.value)}
//               className="w-full border-2 border-gray-700 rounded-lg p-3 text-right"
//               placeholder="118,108.86 USDT"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-400 mb-1">Amount</label>
//             <input
//               type="text"
//               value={buyAmount}
//               onChange={(e) => setBuyAmount(e.target.value)}
//               className="w-full border-2 border-gray-700 rounded-lg p-3 text-right"
//               placeholder="BTC"
//             />
//           </div>

//           <div className="text-sm text-gray-400">
//             <div className="flex justify-between">
//               <span>Total</span>
//               <span>Minimum 5 USDT</span>
//             </div>
//           </div>

//           <div className="flex items-center space-x-2 text-sm">
//             <input type="checkbox" />
//             <span>TP/SL</span>
//           </div>

//           <div className="text-xs text-gray-400 space-y-1">
//             <div className="flex justify-between">
//               <span>Avbl</span>
//               <span className="text-yellow-500">0.00000000 USDT ⚠️</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Max Buy</span>
//               <span>0 BTC</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Est. Fee</span>
//               <span>-</span>
//             </div>
//           </div>

//           <button className="w-full bg-emerald-400 hover:bg-emerald-600 text-white py-3 rounded font-semibold">
//             Buy BTC
//           </button>
//         </div>

//         {/* Sell Form */}
//         <div className="space-y-4">
//           <div className="h-10"></div> {/* Spacer for alignment */}

//           <div>
//             <label className="block text-sm text-gray-400 mb-1">Price</label>
//             <input
//               type="text"
//               value={sellPrice}
//               onChange={(e) => setSellPrice(e.target.value)}
//               className="w-full border-2 border-gray-700 rounded-lg p-3 text-right"
//               placeholder="118,108.86 USDT"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-400 mb-1">Amount</label>
//             <input
//               type="text"
//               value={sellAmount}
//               onChange={(e) => setSellAmount(e.target.value)}
//               className="w-full border-2 border-gray-700 rounded-lg p-3 text-right"
//               placeholder="BTC"
//             />
//           </div>

//           <div className="text-sm text-gray-400">
//             <div className="flex justify-between">
//               <span>Total</span>
//               <span>Minimum 5 USDT</span>
//             </div>
//           </div>

//           <div className="flex items-center space-x-2 text-sm">
//             <input type="checkbox" />
//             <span>TP/SL</span>
//           </div>

//           <div className="text-xs text-gray-400 space-y-1">
//             <div className="flex justify-between">
//               <span>Avbl</span>
//               <span className="text-yellow-500">0.00000000 BTC ⚠️</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Max Sell</span>
//               <span>0 USDT</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Est. Fee</span>
//               <span>-</span>
//             </div>
//           </div>

//           <button className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded font-semibold">
//             Sell BTC
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderForm;
// components/user/OrderForm.jsx
// import React, { useState } from "react";

// const OrderForm = () => {
//   const [isBuy, setIsBuy] = useState(true);
//   const [price, setPrice] = useState("");
//   const [amount, setAmount] = useState("");
//   const [lastPrice] = useState(119039.91); // Giá cuối cùng mẫu
//   const [available] = useState(isBuy ? "10,000.00 USDT" : "1.00000000 BTC");

//   const handleToggleSide = (side) => {
//     setIsBuy(side === "buy");
//     setPrice("");
//     setAmount("");
//   };

//   const getTotal = () => {
//     if (!price || !amount) return "0.00 USDT";
//     return (parseFloat(price) * parseFloat(amount)).toFixed(2) + " USDT";
//   };

//   return (
//     <div className="w-full bg-gray-800 rounded-lg p-4 text-white">
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex space-x-2">
//           <button
//             className={`px-4 py-2 rounded-l-md ${isBuy
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//               }`}
//             onClick={() => handleToggleSide("buy")}
//           >
//             Buy
//           </button>
//           <button
//             className={`px-4 py-2 rounded-r-md ${!isBuy
//                 ? "bg-red-500 text-white"
//                 : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//               }`}
//             onClick={() => handleToggleSide("sell")}
//           >
//             Sell
//           </button>
//         </div>
//         <select className="bg-gray-700 text-white px-2 py-1 rounded">
//           <option>Limit</option>
//           <option>Market</option>
//           <option>Stop Limit</option>
//         </select>
//       </div>
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <span className="text-gray-400">Available</span>
//           <span className="text-white">{available}</span>
//         </div>
//         <div className="flex items-center justify-between">
//           <input
//             type="text"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="w-1/2 bg-gray-700 p-2 rounded text-white"
//           />
//           <span className="text-gray-400">Last {lastPrice} USDT</span>
//         </div>
//         <div className="flex items-center justify-between">
//           <input
//             type="text"
//             placeholder="Amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="w-1/2 bg-gray-700 p-2 rounded text-white"
//           />
//           <select className="bg-gray-700 text-white px-2 py-1 rounded">
//             <option>BTC</option>
//           </select>
//         </div>
//         <div className="flex items-center justify-between">
//           <input
//             type="range"
//             min="0"
//             max="100"
//             value={(amount / (isBuy ? 10000 : 1)) * 100 || 0}
//             onChange={(e) =>
//               setAmount(
//                 ((e.target.value / 100) * (isBuy ? 10000 : 1)).toFixed(8)
//               )
//             }
//             className="w-full"
//           />
//           <span className="text-gray-400">{(amount / (isBuy ? 10000 : 1)) * 100 || 0}%</span>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-gray-400">Buy {getTotal()}</span>
//           <span className="text-gray-400">Max {getTotal()}</span>
//         </div>
//         <div className="space-y-2">
//           <label className="flex items-center">
//             <input type="checkbox" className="mr-2" />
//             <span className="text-gray-400">Take Profit</span>
//             <span className="ml-1 text-gray-500">i</span>
//           </label>
//           <label className="flex items-center">
//             <input type="checkbox" className="mr-2" />
//             <span className="text-gray-400">Trailing Take Profit</span>
//             <span className="ml-1 text-gray-500">i</span>
//           </label>
//           <label className="flex items-center">
//             <input type="checkbox" className="mr-2" />
//             <span className="text-gray-400">Stop Loss</span>
//             <span className="ml-1 text-gray-500">i</span>
//           </label>
//         </div>
//         <button
//           className={`w-full py-2 rounded ${isBuy ? "bg-green-500" : "bg-red-500"
//             } text-white`}
//         >
//           {isBuy ? "Buy BTC" : "Sell BTC"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderForm;


import React, { useState } from "react";

const OrderForm = () => {
  const [tab, setTab] = useState("limit");
  const [side, setSide] = useState("buy");

  const tabs = ["Limit", "Market", "Stop Limit"];

  return (
    <div className="bg-white border rounded-lg p-3 text-sm">
      {/* Tabs */}
      <div className="flex border-b mb-3">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t.toLowerCase().replace(" ", ""))}
            className={`px-3 py-1 border-b-2 text-md font-medium ${tab === t.toLowerCase().replace(" ", "")
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-500"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Buy / Sell */}
      <div className="flex text-lg font-semibold space-x-1 my-3">
        <button
          className={`flex-1 py-1 rounded-xl border ${side === "buy"
            ? "bg-emerald-500 text-white"
            : "bg-white text-gray-700 border-gray-300"
            }`}
          onClick={() => setSide("buy")}
        >
          Buy
        </button>
        <button
          className={`flex-1 py-1 rounded-xl border ${side === "sell"
            ? "bg-orange-600 text-white"
            : "bg-white text-gray-700 border-gray-300"
            }`}
          onClick={() => setSide("sell")}
        >
          Sell
        </button>
      </div>

      {/* Available */}
      <div className="flex justify-between bg-gray-100 p-2 rounded-md text-gray-400 text-md  mb-2">
        <span>Available</span>
        <span>10 000.00 USDT</span>
      </div>

      <div className="mt-5 space-y-1 ">

        {/* Price (Limit / Stop Limit) */}
        {(tab === "limit" || tab === "stoplimit") && (
          <div>
            <span className="text-black">Price</span>
            <div className="flex items-center font-semibold bg-gray-200 border rounded-lg p-2">
              <input
                // type="number"
                placeholder="0"
                className="flex-1 outline-none text-left text-gray-600"
              />
              <span className="ml-2 text-gray-600 text-xs">USDT</span>
            </div>
          </div>
        )}

        {/* Amount */}
        <span className="text-black">Amount</span>
        <div className="flex items-center font-semibold bg-gray-200 border rounded-md p-2">
          <input
            type="number"
            placeholder="0"
            className="flex-1 outline-none text-left  text-gray-600"
          />
          <span className="ml-2 text-gray-600 text-xs">BTC</span>
        </div>
      </div>

      {/* Slider */}
      <div className="flex items-center my-6">
        <input type="range" min="0" max="100" step="25" className="w-full" />
      </div>

      {/* Buy/Max info */}
      <div className="flex justify-between text-gray-500 text-xs mb-3">
        <span>Buy 0.00 USDT</span>
        <span>Max 0.00 USDT</span>
      </div>

      {/* Options */}
      {["Take Profit", "Trailing Take Profit", "Stop Loss"].map((label) => (
        <label key={label} className="flex items-center space-x-2 mb-2">
          <input type="checkbox" />
          <span className="text-gray-700 text-xs">{label}</span>
        </label>
      ))}

      {/* Submit */}
      <button
        className={`w-full py-2 mt-2 rounded-xl ${side === "buy" ? "bg-emerald-500" : "bg-orange-600"
          } text-white font-semibold text-lg`}
      >
        {side === "buy" ? "Buy BTC" : "Sell BTC"}
      </button>
    </div>
  );
};

export default OrderForm;
