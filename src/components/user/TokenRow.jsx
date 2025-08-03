import useMarketData from "../../hooks/useMarketData";


const TokenRow = ({ product }) => {
    const data = useMarketData(product.id)
    

    if (!data) return null;

    const { price, priceChangePercent24h, volume24h, trend } = data;
    const name = product.name;
    const symbol = product.symbol; 
    const changePositive = priceChangePercent24h >= 0;

    const icon = symbol.charAt(0)

    const formatNumber = (num) =>
        num?.toLocaleString('en-US', {
            maximumFractionDigits: 2,
        });

    

    return (
        <div
            className="grid grid-cols-6 gap-4 items-center rounded px-6 py-3 hover:bg-gray-800 transition-colors cursor-pointer"
        >
            {/* Name */}
            <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 font-bold`}>
                    {icon}
                </div>
                <div className="flex items-center space-x-2">
                    <div className="font-medium">{symbol}</div>
                    <div className="text-gray-400 text-[13px]">{name}</div>
                </div>
            </div>

            {/* Price */}
            <div className="flex flex-col items-end">
                <div className="font-medium">{formatNumber(price)}</div>
                <div className="text-[13px] text-gray-400">${formatNumber(price)}</div>
            </div>

            {/* Change */}
            <div className="flex flex-col items-end">
                <div className={`font-medium ${changePositive ? 'text-green-400' : 'text-red-400'}`}>
                    {changePositive ? '+' : ''}
                    {formatNumber(priceChangePercent24h)}%
                </div>
            </div>


            {/* Volume */}
            <div className="text-gray-300 text-right">${formatNumber(volume24h)}</div>

            {/* Market Cap */}
            <div className="text-gray-300 text-right">N/A</div>

            {/* Actions */}
            <div className="flex items-center justify-end w-full text-white font-semibold text-sm space-x-4">
                <a
                    href={`/price/${product.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-gray-500 transition-colors cursor-pointer bg-gray-900 px-1 rounded"
                >
                    Detail
                </a>
                <a
                    href={`/trade/${product.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-gray-500 transition-colors cursor-pointer bg-gray-900 px-1 rounded"
                >
                    Trade
                </a>
            </div>

        </div>
    );
};

export default TokenRow;
