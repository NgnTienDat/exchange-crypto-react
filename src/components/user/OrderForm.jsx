import React, { useState } from "react";
import useMyAsset from "../../hooks/useMyAsset";
import useMarketData from "../../hooks/useMarketData";

const OrderForm = ({ pair }) => {
  const [tab, setTab] = useState("limit");
  const [side, setSide] = useState("buy");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [price, setPrice] = useState("");
  const [isLockOrder, setLockOrder] = useState(true);

  const tabs = ["Limit", "Market", "Stop Limit"];
  const { assets } = useMyAsset();


  const data = useMarketData(pair.replace('-', ''));
  if (!data) return null;

  const { price: bestPrice } = data;

  if (!assets) return <div>Loading...</div>;

  const [baseSymbol, quoteSymbol] = pair.split('-');

  const getAvailable = (symbol) => {
    const asset = assets.find(a => a.cryptoId === symbol);
    if (!asset) return 0;
    return Number((asset.balance - asset.lockedBalance).toFixed(8));
  };

  const availableSymbol = side === "buy" ? quoteSymbol : baseSymbol;
  const availableAmount = getAvailable(availableSymbol);

  const maximumAvailable =
    tab === "market" && side === "buy"
      ? availableAmount / bestPrice
      : availableAmount;

  const validateBalance = (amountValue, priceValue) => {
    let isError = false;

    if (tab === "market") {
      if (Number(amountValue) > maximumAvailable) {
        setError(`Not enough balance, maximum available is ${maximumAvailable.toFixed(8)} ${baseSymbol}`);
        isError = true;
      }
    }

    if (tab === "limit") {
      if (side === "buy" && Number(amountValue) * Number(priceValue) > availableAmount) {
        setError(`Not enough balance, maximum available is ${(availableAmount / priceValue).toFixed(8)} ${baseSymbol}`);
        isError = true;
      }
      if (side === "sell" && Number(amountValue) > availableAmount) {
        setError(`Not enough balance, maximum available is ${availableAmount.toFixed(8)} ${baseSymbol}`);
        isError = true;
      }
    }

    if (isError) {
      setLockOrder(true);
    } else {
      setLockOrder(false);
      setError("");
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (amount === null) setLockOrder(true)
    validateBalance(value, price);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    if (price === null) setLockOrder(true)
    validateBalance(amount, value);
  };


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
      <div className="flex justify-between bg-gray-100 p-2 rounded-md text-gray-400 text-md mb-2">
        <span>Available</span>
        <div className="font-semibold space-x-1">
          <span className="text-gray-600">
            {availableAmount.toLocaleString()}
          </span>
          <span>{availableSymbol}</span>
        </div>
      </div>

      <div className="mt-5 space-y-1">
        {/* Price (Limit / Stop Limit) */}
        {(tab === "limit" || tab === "stoplimit") && (
          <div>
            <span className="text-black">Price</span>
            <div className="flex items-center font-semibold bg-gray-200 border rounded-lg p-2">
              <input
                type="number"
                value={price}
                onChange={handlePriceChange}
                placeholder="0"
                className="flex-1 outline-none text-left text-gray-600"
              />

              <span className="ml-2 text-gray-600 text-xs">{quoteSymbol}</span>
            </div>
            {error && <div className="text-red-500 text-xs">{error}</div>}

          </div>
        )}

        {/* Amount */}
        <span className="text-black">Amount</span>
        <div
          className={`flex items-center font-semibold focus-within:bg-white focus-within:border-blue-500 bg-gray-200 border rounded-md p-2 ${error ? "border-red-500" : ""
            }`}
        >
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0"
            className="flex-1 outline-none text-left text-gray-600 "
          />
          <span className="ml-2 text-gray-600 text-xs">{baseSymbol}</span>
        </div>
        {error && <div className="text-red-500 text-xs">{error}</div>}
      </div>

      {/* Slider */}
      <div className="flex items-center my-6 ">
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
        className={`w-full py-2 mt-2 rounded-xl ${!!error || !amount || !price || Number(amount) === 0 || Number(price) === 0
            ? "bg-gray-400 cursor-not-allowed"
            : side === "buy"
              ? "bg-emerald-500"
              : "bg-orange-600"
          } text-white font-semibold text-lg`}
        disabled={
          !!error || !amount || !price || Number(amount) === 0 || Number(price) === 0
        }
      >
        {side === "buy" ? `Buy ${baseSymbol}` : `Sell ${baseSymbol}`}
      </button>



    </div>
  );
};

export default OrderForm;
