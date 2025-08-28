// src/pages/Home.jsx
import React, { useEffect } from "react";
import TickerTape from "../../components/user/TickerTape";
import Footer from "../../layouts/user/Footer";

const Home = () => {


  useEffect(() => {
    console.log("redirectUlr", window.location.href);
  }, [])


  return (
    <div className="min-h-screen bg-white text-black">
      {/* Ticker bar */}
      <div className="">
        <TickerTape />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-12 gap-8 px-[160px] py-12">
        {/* Left content */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center space-y-8">
          <h1 className="text-6xl font-extrabold leading-tight">
            <span className="text-yellow-500">Simulated</span><br />
            Cryptocurrency<br />Trading
          </h1>


          {/* Input register */}
          <div className="flex max-w-md">
            <input
              type="text"
              placeholder="Email / Phone number"
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 focus:outline-none"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-r-lg font-semibold">
              Get Started
            </button>
          </div>

          {/* Continue with */}
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="text-sm">Or continue with</div>
            <div className="flex space-x-4">
              <button className="p-2 border rounded-lg">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
              </button>
             
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          {/* Popular tokens */}
          <div className="bg-white shadow p-4 rounded-xl">
            <div className="flex justify-between items-center mb-4 text-sm text-gray-800">
              <div className="flex space-x-6">
                <div className="text-yellow-400 border-b-2 border-yellow-400 pb-1 cursor-pointer">
                  Popular
                </div>
                <div className="cursor-pointer">New Listings</div>
              </div>
              <div className="text-xs hover:underline cursor-pointer">
                View all 350+ coins ›
              </div>
            </div>

            <div className="space-y-4 text-sm">
              {[
                { name: "BTC", full: "Bitcoin", price: "$113,691.97", change: "-0.03%", up: false },
                { name: "ETH", full: "Ethereum", price: "$4,299.31", change: "+2.68%", up: true },
                { name: "BNB", full: "BNB", price: "$864.89", change: "+3.34%", up: true },
                { name: "XRP", full: "XRP", price: "$2.91", change: "+0.54%", up: true },
                { name: "SOL", full: "Solana", price: "$186.95", change: "+3.20%", up: true },
              ].map((item) => (
                <div className="flex justify-between items-center" key={item.name}>
                  <div className="flex space-x-2 items-center">
                    <div className="w-6 h-6 bg-gray-200 rounded-full" />
                    <div>
                      {item.name} <span className="text-gray-500">{item.full}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{item.price}</div>
                    <div className={item.up ? "text-green-500" : "text-red-500"}>
                      {item.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* News section */}
          <div className="bg-white shadow p-4 rounded-xl text-sm space-y-3">
            <div className="flex justify-between text-gray-700 mb-2">
              <div className="font-semibold">News</div>
              <div className="text-xs hover:underline cursor-pointer">View all news ›</div>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>New York Lawmakers Propose Crypto Transaction Tax...</p>
              <p>WLFI Treasury Expands with New USD1 Issuance</p>
              <p>iOS Releases Important Security Update to Fix Zero-Day...</p>
              <p>Visa Seeks Blockchain Data Analysts to Enhance Payments...</p>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Home;
