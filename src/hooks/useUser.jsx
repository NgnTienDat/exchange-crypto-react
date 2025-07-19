import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/userService";

function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: 1,
  });
  return { isLoading, user };
}

export default useUser;