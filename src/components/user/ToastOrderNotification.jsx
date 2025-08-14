import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ToastOrderNotification = ({ payload }) => {

    const handleClick = () => {
        toast.dismiss();
    };

    return (
        <div className="bg-white shadow-lg border border-gray-200 p-4 rounded-lg flex items-center space-x-4">
            <div className="text-xl">📦</div>
            <div className="flex-1">
                <p className="">{payload.pairId}</p>
                <p className="">{payload.price}</p>
                <p className="">{payload.quantity}</p>
            </div>
            <button
                className="text-blue-600 font-medium hover:underline"
                onClick={handleClick}
            >
                Xem
            </button>
        </div>
    );
};

export default ToastOrderNotification;
