import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getOrdersByPairId, placeOrder } from "../services/orderService";
import { getAccessToken } from "../utils/helper";

function useOrder(pairId) {
  const queryClient = useQueryClient();

  const { isLoading, mutate: placeNewOrder } = useMutation({
    mutationFn: (order) =>
      placeOrder(order),
    onSuccess: (order) => {
      toast.success("Place order successful");
      queryClient.invalidateQueries(["order", pairId]);


    },
    onError: (err) => {
      console.log("error useOrder: ", err?.response?.data);

      const errorMessage = err?.response?.data?.message || "Place order failed";
      toast.error(errorMessage);
    }
  });

  const { data: myOrders } = useQuery({
    queryKey: ["order", pairId],
    queryFn: () => getOrdersByPairId(pairId),
    retry: 1,
    enabled: !!pairId,
    placeholderData: null,
  });

  return { isLoading, placeNewOrder, myOrders };
}

export default useOrder;
