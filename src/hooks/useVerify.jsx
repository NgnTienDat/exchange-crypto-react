import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { removeCookieToken, setCookieToken } from "../utils/helper";
import { verifyCode } from "../services/authService";
import toast from "react-hot-toast";

function useVerify() {
    const navigate = useNavigate();
    //   const queryClient = useQueryClient();
    const { isLoading, mutate: verify } = useMutation({
        mutationFn: (code) =>
            verifyCode(code),
        onSuccess: (data) => {
            removeCookieToken()
            setCookieToken(data.token);

            //   queryClient.setQueryData(["user"], {
            //     ...user,
            //   });
            
            navigate("/my/security");
            toast.success("Successfully enabled 2FA")
        },
        onError: (err) => {
            console.log(err);
            toast.error(err.response.data.message);
        },
    });
    return { isLoading, verify };
}

export default useVerify;