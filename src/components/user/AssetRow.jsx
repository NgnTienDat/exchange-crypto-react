import React from "react";
import useMarketData from "../../hooks/useMarketData";

const AssetRow = ({ coin }) => {


    const data = coin.symbol !== 'USDT' ? useMarketData(coin.id.replace('-', '')) : {price:'1.00'}


    if (!data) return null;
    // console.log("DATA: ", data)     

    const { price } = data;

    const icon = coin.symbol.charAt(0)

    const formatNumber = (num) =>
        num?.toLocaleString('en-US', {
            maximumFractionDigits: 2,
        });


    return (
        <div
            className="grid grid-cols-4 items-center py-3 border-b border-gray-200 hover:bg-gray-50 transition"
        >
            {/* Coin info */}
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-500 text-white font-bold`}>
                    {icon}
                </div>
                <div>
                    <div className="font-medium text-black">{coin.symbol}</div>
                    <div className="text-gray-500 text-xs">{coin.name}</div>
                </div>
            </div>

            {/* Amount */}
            <div>
                <div className="text-black">{formatNumber(coin.balance)}</div>
                {/* <div className="text-gray-500 text-xs">
          {(coin.amount * coin.price).toFixed(2)} USD
        </div> */}
            </div>

            {/* Price */}
            <div className="text-black">{formatNumber(price)} USDT</div>

            {/* Action */}
            <div className="text-right text-amber-500 hover:text-amber-400 cursor-pointer">
                Tiền mặt
            </div>
        </div>
    );
};

export default AssetRow;
