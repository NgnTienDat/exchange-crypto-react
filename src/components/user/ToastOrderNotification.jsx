import React from "react";
import { toast } from "react-hot-toast";
import { X } from "lucide-react"; // icon đóng

const ToastOrderNotification = ({ payload }) => {
    const handleClose = () => {
        toast.dismiss();
    };

    const [baseSymbol, quoteSymbol] = payload.pairId.split('-');

    return (
        <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-4 w-80 flex items-start space-x-3">
            <div className="flex-shrink-0">
                <div className="bg-yellow-400 text-white font-bold w-10 h-10 flex items-center justify-center rounded">
                    C
                </div>
            </div>

            {/* Nội dung thông báo */}
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <p className="font-bold text-gray-800">
                        {payload.pairId}
                    </p>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={16} />
                    </button>
                </div>
                <p className="text-sm font-semibold text-gray-500"></p>
                <p className="text-sm text-gray-800 mt-1">
                    {payload.side === "BID" ? "Buy" : "Sell"}{" "}
                    {payload.quantity} {baseSymbol} at{" "}
                    {Number(payload.price).toLocaleString()}{" "}
                    {quoteSymbol}
                </p>
            </div>
        </div>
    );
};

export default ToastOrderNotification;
