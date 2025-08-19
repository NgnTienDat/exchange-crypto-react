import React from "react";
import { Search } from "lucide-react";
import AssetRow from "../../../components/user/AssetRow";
import useMyAsset from "../../../hooks/useMyAsset";

const coins = [
  { symbol: "BNB", name: "BNB", price: 845.32, amount: 0, icon: "/icons/bnb.svg" },
  { symbol: "BTC", name: "Bitcoin", price: 115366.64, amount: 0, icon: "/icons/btc.svg" },
  { symbol: "ETH", name: "Ethereum", price: 4286.86, amount: 0, icon: "/icons/eth.svg" },
  { symbol: "USDT", name: "TetherUS", price: 1.0, amount: 0, icon: "/icons/usdt.svg" },
];

const Asset = () => {

  const { assets } = useMyAsset()
  if (!assets) return <div>Loading...</div>

  const tokenList =
    assets?.map(asset => ({
      id: `${asset.cryptoId}-USDT`,   // thêm USDT đằng sau
      name: asset.cryptoId,           // nếu có API mapping name chuẩn thì thay ở đây
      symbol: asset.cryptoId,
      balance: asset.balance
    })) ?? [];

  console.log("tokenList: ", tokenList);


  return (
    <div className="bg-white text-black p-6 rounded-xl w-[80%] mx-auto mt-6 shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tài sản của tôi</h2>
        <a href="#" className="text-sm text-gray-600 hover:text-black">
          Xem tất cả hơn 350 coin &gt;
        </a>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 text-sm border-b border-gray-300 mb-4">
        <button className="pb-2 border-b-2 border-amber-400 text-amber-500 font-medium">
          Xem theo Coin
        </button>
        <button className="pb-2 text-gray-600 hover:text-black">
          Chế độ xem tài khoản
        </button>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Tìm coin..."
            className="bg-transparent outline-none text-sm text-black placeholder-gray-500"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input type="checkbox" className="accent-amber-500" />
          Ẩn tài sản &lt; 1 USD
        </label>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-4 text-gray-600 text-sm py-2 border-b border-gray-300">
        <span>Coin</span>
        <span>Số lượng</span>
        <span>Giá coin</span>
        <span className="text-right">Hành động</span>
      </div>

      {/* Table rows */}
      {tokenList.map((coin) => (
        <AssetRow key={coin.symbol} coin={coin} />
      ))}
    </div>
  );
};

export default Asset;
