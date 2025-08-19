import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllOrder, getOpenOrdersByPairId, getOrderHistoryByPairId, getOrdersByPairId, placeOrder } from "../services/orderService";

function useOrderHistory() {


  const { data: orders} = useQuery({
    queryKey: ["orders", "all"],
    queryFn: () => getAllOrder(),
    retry: 1,
    placeholderData: null,
  });

  

  // console.log("open: ", openOrders)
  // console.log("history: ", orderHistory)

  return { orders };
}

export default useOrderHistory;
