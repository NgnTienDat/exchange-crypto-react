import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { closeTrade, openTrade } from "../services/tradeService";

function useTrade() {
    const { isLoading: isOpening, mutate: openTradeDetail } = useMutation({
        mutationFn: (productId) => openTrade(productId),
        onSuccess: (data) => {
            // toast.success("Hello dude!!")
        },
        onError: (err) => {
            console.log(err);
            toast.error(err.response?.data?.message || "Open trade failed");
        },
    });


    const { isLoading: isClosing, mutate: closeTradeDetail } = useMutation({
        mutationFn: (productId) => closeTrade(productId),
        onError: (err) => {
            console.log(err);
            toast.error(err.response?.data?.message || "Close trade failed");
        },
    });
    return { isOpening, isClosing, openTradeDetail, closeTradeDetail };
}

export default useTrade;