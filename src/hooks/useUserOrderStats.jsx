import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../utils/helper";
import { getUserOrderStats } from "../services/orderService";

function useUserOrderStats(userId) {
  const { isLoading, data: stats } = useQuery({
    queryKey: ["ordersStats", userId],
    queryFn: () => getUserOrderStats(userId),
    retry: 1,
    enabled: !!getAccessToken(),
  });

  return { isLoading, stats };
}

export default useUserOrderStats;
