import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllOrdersByAdmin, getOpenOrdersByPairId, getOrderHistoryByPairId, getOrdersByPairId, placeOrder } from "../services/orderService";
import { getAccessToken } from "../utils/helper";

function useOrders(page = 0, size = 3) {
  const { isLoading: allOrdersLoading, data, error } = useQuery({
    queryKey: ["orders", page, size],
    queryFn: () => getAllOrdersByAdmin(page, size),
    retry: 1,
    enabled: !!getAccessToken(),
    keepPreviousData: true,
    staleTime: 30000, 
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