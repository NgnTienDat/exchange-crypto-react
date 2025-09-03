import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getOpenOrdersByPairId, getOrderHistoryByPairId, placeOrder } from "../services/orderService";
import useUser from "./useUser";

function useOrder(pairId, openPage = 0, historyPage = 0, size = 7) {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: placeNewOrder, isLoading } = useMutation({
    mutationFn: placeOrder,

    onSuccess: (newOrder) => {
      toast.success("Place order successful");
      
      // Update only the first page cache optimistically
      queryClient.setQueryData(["orders", "open", pairId, 0, size], (old) => {
        if (!old) return { content: [newOrder], page: 0, size, hasNext: false };

        return {
          ...old,
          content: [newOrder, ...old.content].slice(0, size),
        };
      });

      // Invalidate other pages to ensure consistency
      queryClient.invalidateQueries({
        queryKey: ["orders", "open", pairId],
        exact: false,
        predicate: (query) => {
          const [, , , page] = query.queryKey;
          return page !== 0; // Don't invalidate page 0 since we just updated it
        }
      });
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Place order failed");
    },
  });

  const { isLoading: openLoading, data: openOrdersData } = useQuery({
    queryKey: ["orders", "open", pairId, openPage, size],
    queryFn: () => getOpenOrdersByPairId(pairId, openPage, size),
    retry: 1,
    enabled: !!user && !!pairId,
    // Remove initialData and placeholderData to prevent stale data issues
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchOnWindowFocus: false, // Prevent unnecessary refetches
  });

  const { isLoading: historyLoading, data: historyData } = useQuery({
    queryKey: ["orders", "history", pairId, historyPage, size],
    queryFn: () => getOrderHistoryByPairId(pairId, historyPage, size),
    retry: 1,
    enabled: !!user && !!pairId,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  return {
    isLoading,
    placeNewOrder,

    historyLoading,
    orderHistory: historyData?.content || [],
    historyPagination: {
      page: historyData?.page || historyPage,
      size: historyData?.size || size,
      hasNext: historyData?.hasNext || false,
    },

    openLoading,
    openOrders: openOrdersData?.content || [],
    openPagination: {
      page: openOrdersData?.page || openPage,
      size: openOrdersData?.size || size,
      hasNext: openOrdersData?.hasNext || false,
    },
  };
}

export default useOrder;