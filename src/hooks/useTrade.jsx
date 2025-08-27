import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { closeTrade, getAllTradesAdmin, openTrade } from "../services/tradeService";
import { getAccessToken } from "../utils/helper";

function useTrade(page = 0, size = 10) {
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




    const { isLoading: tradeLoading, data, error } = useQuery({
        queryKey: ["trades", page, size],
        queryFn: () => getAllTradesAdmin(page, size),
        retry: 1,
        enabled: !!getAccessToken(),
        keepPreviousData: true,
        staleTime: 30000,
    });


    return {

        isOpening, isClosing, openTradeDetail, closeTradeDetail,

        tradeLoading,
        trades: data?.content || [],
        pagination: {
            page: data?.page,
            size: data?.size,
            hasNext: data?.hasNext,
        },
        error,
    };

}

export default useTrade;