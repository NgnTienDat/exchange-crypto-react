import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../utils/helper";
import { getAdminOrderBook, getUserOrders } from "../services/orderService";

function useOrderBook(pairId = "BTC-USDT", limit = 10) {
  const { isLoading: askLoading, data: askOrders } = useQuery({
    queryKey: ["orderbook", pairId, 'ASK'],
    queryFn: () => getAdminOrderBook(pairId, limit, 'ask'),
    retry: 1,
    enabled: !!getAccessToken(),
    keepPreviousData: true,
    staleTime: 30000,
  });
  const { isLoading: bidLoading, data: bidOrders } = useQuery({
    queryKey: ["orderbook", pairId, 'BID'],
    queryFn: () => getAdminOrderBook(pairId, limit, 'bid'),
    retry: 1,
    enabled: !!getAccessToken(),
    keepPreviousData: true,
    staleTime: 30000,
  });

  return {
    askLoading,
    bidLoading,
    askOrders: askOrders || [],
    bidOrders: bidOrders || [],
  };
}

export default useOrderBook;
