import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/userService";
import { getAccessToken } from "../utils/helper";

function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: 2,
    enabled: !!getAccessToken(),
  });

  return { isLoading, user };
}

export default useUser;