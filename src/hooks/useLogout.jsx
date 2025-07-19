// hooks/useLogout.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAPI } from "../services/userService";
import { removeCookieToken } from "../utils/helper";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

export default function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    // const { logout: setLogout } = useAuth()

    const { mutate: logout } = useMutation({
        mutationFn: logoutAPI,
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["user"] });
            // setLogout(); // Clear auth context
            removeCookieToken();
            navigate("/");
        },
        onError: (err) => {
            console.error("Logout failed:", err);
        },
    });

    return { logout };
}
