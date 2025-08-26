import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../utils/helper";
import { getUserOrders } from "../services/orderService";

function useUserOrder(userId, page = 0, size = 10) {
  const { isLoading, data: orders } = useQuery({
    queryKey: ["userOrders", userId, page, size],
    queryFn: () => getUserOrders(userId, page, size),
    retry: 1,
    enabled: !!getAccessToken(),
  });

  return { isLoading, orders };
}

export default useUserOrder;
