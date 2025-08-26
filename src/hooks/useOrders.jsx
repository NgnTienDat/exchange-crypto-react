import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllOrdersByAdmin, getOpenOrdersByPairId, getOrderHistoryByPairId, getOrdersByPairId, placeOrder } from "../services/orderService";
import useUser from "./useUser";
import { getAccessToken } from "../utils/helper";

function useOrders(page = 0, size = 10) {
  const { isLoading: allOrdersLoading, data, error } = useQuery({
    queryKey: ["orders", page, size],
    queryFn: () => getAllOrdersByAdmin(page, size),
    retry: 1,
    enabled: !!getAccessToken(),
  });

  return {
    allOrdersLoading,
    orders: data?.content || [],
    pagination: {
      page: data?.page,
      size: data?.size,
      totalElements: data?.totalElements,
      totalPages: data?.totalPages,
    },
    error,
  };


}

export default useOrders;
