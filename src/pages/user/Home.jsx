// src/pages/Home.jsx
import React from "react";
import TickerTape from "../../components/user/TickerTape";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0B0E11] text-white px-30 space-y-3">
      <div className="p-5">
        <TickerTape />
      </div>
      {/* Left content */}
      <div className="grid grid-cols-12 gap-8">

        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            <span className="text-amber-400">Giao dịch</span> hơn 10<br />
            loại tiền mã hoá<br />trên CryptoCoin
          </h1>

          <div className="text-sm text-gray-400">
            Số dư ước tính của bạn <span className="ml-1">👁️</span>
          </div>

          <div>
            <div className="text-3xl font-bold">0.00 <span className="text-sm">BTC</span></div>
            <div className="text-gray-400">≈ $0.00</div>
            <div className="mt-1 text-sm text-gray-400">PNL của hôm nay $0.00 (0.00%)</div>
          </div>

          <div className="flex space-x-4 mt-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-semibold">
              Giao dịch ngay
            </button>
            <button className="bg-transparent text-white border border-gray-600 px-4 py-2 rounded font-semibold">
              📘 Đọc hướng dẫn
            </button>
          </div>
        </div>

        {/* Right content */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          {/* Popular tokens */}
          <div className="bg-[#1E2026] p-4 rounded-xl">
            <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
              <div className="flex space-x-4">
                <div className="text-yellow-400 border-b-2 border-yellow-400 pb-1">Phổ biến</div>
                <div>Niêm yết mới</div>
              </div>
              <div className="text-xs hover:underline cursor-pointer">Xem tất cả 350+ coin ›</div>
            </div>

            <div className="space-y-3 text-sm">
              {[
                { name: "BTC", full: "Bitcoin", price: "$115,391.99", change: "-3,05%" },
                { name: "ETH", full: "Ethereum", price: "$3,587.63", change: "-1,96%" },
                { name: "BNB", full: "BNB", price: "$755.10", change: "-3,43%" },
                { name: "XRP", full: "XRP", price: "$3.06", change: "-4,80%" },
                { name: "SOL", full: "Solana", price: "$176.75", change: "-7,59%" },
              ].map((item) => (
                <div className="flex justify-between items-center" key={item.name}>
                  <div className="flex space-x-2 items-center">
                    <div className="w-5 h-5 bg-gray-600 rounded-full" /> {/* Avatar placeholder */}
                    <div>{item.name} <span className="text-gray-400">{item.full}</span></div>
                  </div>
                  <div className="text-right">
                    <div>{item.price}</div>
                    <div className="text-red-500">{item.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* News section */}
          <div className="bg-[#1E2026] p-4 rounded-xl text-sm space-y-2">
            <div className="flex justify-between text-gray-400 mb-2">
              <div className="font-semibold text-white">Tin tức</div>
              <div className="text-xs hover:underline cursor-pointer">Xem tất cả tin tức ›</div>
            </div>
            <div className="space-y-1 text-gray-300">
              <p>Ngân hàng Hàn Quốc Tìm Kiếm Thương Hiệu cho Stablecoin Liên Kết với Đô La và Yên</p>
              <p>Bitcoin(BTC) Giảm Xuống Dưới 116,000 USDT với Mức Giảm 2.59% Trong 24 Giờ</p>
              <p>Kết Quả Mua Ethereum Gây Ra Khoản Lỗ Đáng Kể</p>
              <p>BNB Giảm Xuống Dưới 760 USDT với Mức Giảm 3.15% Trong 24 Giờ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
