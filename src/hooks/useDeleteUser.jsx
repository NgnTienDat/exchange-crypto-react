import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast"; // or your toast library
import { deleteUser } from "../services/userService";

function useDeleteUser(onClose = null) {
  const queryClient = useQueryClient();

  const { isLoading, mutate: delUser } = useMutation({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: (data, deletedUserId) => {
      toast.success("Delete user successful");

      // Clean up all queries related to the deleted user
      queryClient.removeQueries({
        queryKey: ["ordersStats", deletedUserId]
      });
      
      queryClient.removeQueries({
        queryKey: ["userOrders", deletedUserId]
      });
      
      queryClient.removeQueries({
        queryKey: ["userAssets", deletedUserId]
      });

      // Remove all queries that include the userId (more comprehensive)
      queryClient.removeQueries({
        predicate: (query) => {
          return query.queryKey.includes(deletedUserId);
        }
      });

      // Invalidate and refetch the users list to update the table
      queryClient.invalidateQueries({
        queryKey: ["users"]
      });

      // Close modal if onClose callback is provided (for UserModal)
      if (onClose && typeof onClose === 'function') {
        onClose();
      }
    },
    onError: (err) => {
      const errorMessage = err?.response?.data?.message || "Delete user failed";
      toast.error(errorMessage);
    }
  });

  return { isLoading, delUser };
}

export default useDeleteUser;