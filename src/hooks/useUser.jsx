import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/userService";
import { getAccessToken } from "../utils/helper";

function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: 1,
    enabled: !!getAccessToken(),
    placeholderData: null,
  });

  // console.log('useUser:', { isLoading, user, token: getAccessToken() })
  return { isLoading, user };
}

export default useUser;