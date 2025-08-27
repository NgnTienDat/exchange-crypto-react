import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/userService";
import { getAccessToken } from "../utils/helper";

function useUsers(page = 0, size = 10) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["users", page, size],
    queryFn: () => getAllUsers(page, size),
    retry: 1,
    enabled: !!getAccessToken(),
  });

  return {
    isLoading,
    users: data?.content || [],
    pagination: {
      page: data?.page,
      size: data?.size,
      totalElements: data?.totalElements,
      totalPages: data?.totalPages,
    },
    error,
  };
}

export default useUsers;
