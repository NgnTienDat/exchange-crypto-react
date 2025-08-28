import { useQuery } from "@tanstack/react-query";
import { countTotalUsers, getCurrentUser } from "../services/userService";
import { getAccessToken } from "../utils/helper";

function useUserStats() {
  const { isLoading, data: totalUsers } = useQuery({
    queryKey: ["user-stats", "total"],
    queryFn: countTotalUsers,
    retry: 1,
    enabled: !!getAccessToken(),
  });

  return { isLoading, totalUsers };
}

export default useUserStats;