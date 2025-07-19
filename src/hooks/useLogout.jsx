import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAPI } from "../services/userService";
import { removeCookieToken } from "../utils/helper";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logout } = useMutation({
        mutationFn: logoutAPI,
        onSuccess: () => {
            queryClient.removeQueries(['user'])
            removeCookieToken();
            navigate("/");
        },
        onError: (err) => {
            console.error("Logout failed:", err);
        },
    });

    return { logout };
}
