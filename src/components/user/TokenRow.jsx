import useMarketData from "../../hooks/useMarketData";


const TokenRow = ({ productId }) => {
    // console.log(productId)
    const data = useMarketData(productId);
    console.log("data row: ", data)


    if (!data) return null;

    const { price, priceChangePercent24h, volume24h, trend } = data;



    // Giả sử name & symbol tạm thời lấy từ productId
    const [symbol, quote] = productId.split('-');
    const name = symbol; // Nếu cần ánh xạ tên đầy đủ, có thể dùng mapping riêng
    const changePositive = priceChangePercent24h >= 0;

    const icon = symbol.charAt(0)

    const formatNumber = (num) =>
        num?.toLocaleString('en-US', {
            maximumFractionDigits: 2,
        });

    return (
        <div
            className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
        >
            {/* Name */}
            <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 font-bold`}>
                    {icon}
                </div>
                <div>
                    <div className="font-medium">{symbol}</div>
                    <div className="text-gray-400 text-sm">{name}</div>
                </div>
            </div>

            {/* Price */}
            <div>
                <div className="font-medium">${formatNumber(price)}</div>
                <div className="text-gray-400 text-sm">{productId}</div>
            </div>

            {/* Change */}
            {/* Change */}
            <div>
                <div className={`font-medium ${changePositive ? 'text-green-400' : 'text-red-400'}`}>
                    {changePositive ? '+' : ''}
                    {formatNumber(priceChangePercent24h)}%
                </div>
            </div>


            {/* Volume */}
            <div className="text-gray-300">${formatNumber(volume24h)}</div>

            {/* Market Cap */}
            <div className="text-gray-300">N/A</div>

            {/* Actions */}
            <div className="flex items-center justify-center space-x-4">
                <a
                    href={`/price/${productId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white hover:bg-black transition-colors cursor-pointer bg-gray-900 px-1 rounded">
                    Detail
                </a>
                <a
                    href={`/trade/${productId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white  hover:bg-black transition-colors cursor-pointer bg-gray-900 px-1 rounded">
                    Trade
                </a>
            </div>
        </div>
    );
};

export default TokenRow;
