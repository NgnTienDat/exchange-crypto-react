import React from 'react';
import { Info } from 'lucide-react';
import useMyAsset from '../../hooks/useMyAsset';
import { assetConfig } from '../../utils/helper';

const MyBalance = () => {
    const { assets } = useMyAsset();

    if (!assets) return <div>Loading...</div>;


    // Process assets data
    const processedAssets = assets.map(asset => {
        const config = assetConfig[asset.cryptoId] || {
            name: asset.cryptoId,
            icon: asset.cryptoId.charAt(0),
            iconBg: 'bg-gray-400'
        };

        const balance = parseFloat(asset.balance) || 0;
        const lockedBalance = parseFloat(asset.lockedBalance) || 0;
        const availableBalance = balance - lockedBalance;

        return {
            id: asset.cryptoId.toLowerCase(),
            symbol: asset.cryptoId,
            name: config.name,
            icon: config.icon,
            iconBg: config.iconBg,
            reserved: lockedBalance > 0
                ? lockedBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : '—',
            balance: balance,
            availableBalance: availableBalance,
            lastUpdated: asset.lastUpdated
        };
    });

    // Calculate totals (for display purposes - would need price data for USD conversion)
    const totalBalance = processedAssets.reduce((sum, asset) => sum + asset.balance, 0);
    const totalLocked = processedAssets.reduce((sum, asset) => sum + asset.lockedBalance, 0);

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-700">Balance</h2>
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">C</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">CryptoCoin</span>
                </div>
            </div>

            {/* Total PNL */}
            <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                    <Info className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Total PNL</span>
                </div>
                <span className="text-sm font-medium text-gray-900">0.00 USD</span>
            </div>

            {/* Table Headers */}
            <div className="grid grid-cols-3 gap-4 mb-4 text-xs text-gray-500 font-medium">
                <div>Asset</div>
                <div>Reserved</div>
                <div className='text-right'>Available</div>
            </div>

            {/* Asset List */}
            <div className="space-y-4 mb-6">
                {processedAssets.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                        No assets found
                    </div>
                ) : (
                    processedAssets.map((asset) => (
                        <div key={asset.id} className="grid grid-cols-3 gap-4 items-center">
                            {/* Asset */}
                            <div className="flex items-center space-x-3">
                                <div className={`w-6 h-6 ${asset.iconBg} rounded-full flex items-center justify-center`}>
                                    <span className="text-white text-sm font-bold">{asset.icon}</span>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{asset.symbol}</div>
                                    <div className="text-xs text-gray-500">{asset.name}</div>
                                </div>
                            </div>

                            {/* Reserved */}
                            <div className="text-sm font-semibold text-gray-500 ">{asset.reserved.toLocaleString()}</div>

                            {/* Available */}
                            <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">{asset.availableBalance.toLocaleString()}</div>
                                <div className="text-xs text-gray-500">{asset.symbol}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Total
            <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="text-sm font-semibold text-gray-900">Total</div>
                    <div className="text-sm text-gray-600">
                        <div>{totalLocked.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">Assets</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">{totalBalance.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">Assets</div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default MyBalance;