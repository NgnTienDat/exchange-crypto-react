import useMarketData from "../../hooks/useMarketData";


const TokenRow = ({ productId }) => {
    console.log(productId)
    const data = useMarketData(productId);
    console.log("data row: ", data)


    if (!data) return null;

    const { price, priceChange24h, volume24h, trend } = data;

    // Giả sử name & symbol tạm thời lấy từ productId
    const [symbol, quote] = productId.split('-');
    const name = symbol; // Nếu cần ánh xạ tên đầy đủ, có thể dùng mapping riêng

    const changePositive = priceChange24h >= 0;
    const icon = symbol.charAt(0); // Icon tạm là chữ cái đầu
    const iconColor =
        trend === 'UP' ? 'bg-green-600' :
            trend === 'DOWN' ? 'bg-red-600' :
                'bg-gray-600';

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
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconColor} font-bold`}>
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
            <div>
                <div className={`font-medium ${changePositive ? 'text-green-400' : 'text-red-400'}`}>
                    {changePositive ? '+' : ''}${formatNumber(priceChange24h)}
                </div>
            </div>

            {/* Volume */}
            <div className="text-gray-300">${formatNumber(volume24h)}</div>

            {/* Market Cap */}
            <div className="text-gray-300">N/A</div>

            {/* Actions */}
            <div className="flex items-center justify-center space-x-2">
                <button className="text-gray-400 hover:text-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                    </svg>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V7H21V9ZM21 16C21 17.1 20.1 18 19 18S17 17.1 17 16S17.9 14 19 14S21 14.9 21 16ZM5 18C6.1 18 7 17.1 7 16S6.1 14 5 14S3 14.9 3 16S3.9 18 5 18Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TokenRow;
