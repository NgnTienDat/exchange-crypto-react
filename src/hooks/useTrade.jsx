import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { openTrade } from "../services/tradeService";

function useTrade() {
    const { isLoading, mutate: openTradeDetail } = useMutation({
        mutationFn: (productId) =>
            openTrade(productId),
        onSuccess: (data) => {
            // toast.success("Hello dude!!")
        },
        onError: (err) => {
            console.log(err);
            toast.error(err.response.data.message);
        },
    });
    return { isLoading, openTradeDetail };
}

export default useTrade;