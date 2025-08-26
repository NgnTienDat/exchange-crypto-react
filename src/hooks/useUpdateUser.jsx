import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast"; // or your toast library
import { lockUser } from "../services/userService"; // adjust import path

function useUpdateUser() {
    const queryClient = useQueryClient();

    const { isLoading, mutate: lockUserAccount } = useMutation({
        mutationFn: (data) => lockUser(data),

        onSuccess: (updatedUser) => {
            toast.success("Update user successful");

        
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });

    
        },
        onError: (err) => {
            console.log("error lock user: ", err?.response?.data);
            const errorMessage = err?.response?.data?.message || "Lock user failed";
            toast.error(errorMessage);
        }
    });

    return { 
        isLoading, 
        lockUserAccount
    };
}

export default useUpdateUser;