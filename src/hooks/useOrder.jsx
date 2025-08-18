import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getOpenOrdersByPairId, getOrderHistoryByPairId, getOrdersByPairId, placeOrder } from "../services/orderService";

function useOrder(pairId) {
  const queryClient = useQueryClient();

  const { isLoading, mutate: placeNewOrder } = useMutation({
    mutationFn: (order) =>
      placeOrder(order),

    onSuccess: (newOrder) => {
      toast.success("Place order successful");

      queryClient.setQueryData(["orders", "open", pairId], (oldData) => {

        if (!oldData) return [newOrder];

        return [newOrder, ...oldData];
      });
    },
    onError: (err) => {
      console.log("error useOrder: ", err?.response?.data);
      const errorMessage = err?.response?.data?.message || "Place order failed";
      toast.error(errorMessage);
    }
  });

  const { data: openOrders} = useQuery({
    queryKey: ["orders", "open", pairId],
    queryFn: () => getOpenOrdersByPairId(pairId),
    retry: 1,
    enabled: !!pairId,
    placeholderData: null,
  });

  const { data: orderHistory} = useQuery({
    queryKey: ["orders", "history", pairId],
    queryFn: () => getOrderHistoryByPairId(pairId),
    retry: 1,
    enabled: !!pairId,
    placeholderData: null,
  });


  // console.log("open: ", openOrders)
  // console.log("history: ", orderHistory)

  return { isLoading, placeNewOrder, openOrders, orderHistory };
}

export default useOrder;
