import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/userService";
import { setCookieToken, setDeviceId } from "../utils/helper";
import toast from "react-hot-toast";

function useLogin({ onRequire2FA }) {

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { isLoading, mutate: login } = useMutation({
    mutationFn: (loginData) => loginApi(loginData),
    onSuccess: (user, variables) => {

      if (user.condition === "2FA_REQUIRED") {
        // gọi callback để mở VerifyCodeModal
        console.log("condition: ", user.condition)
        if (onRequire2FA) onRequire2FA(user.userId); // user.message = userId
        return;
      }

      setCookieToken(user.token);
      setDeviceId(variables.deviceId);
      // queryClient.invalidateQueries(["user"]);
      queryClient.setQueryData(["user"], user);

      console.log("roles", user.roles)
      if (user.roles?.includes("ADMIN")) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    },
    onError: (err) => {
      console.log("error useLogin: ", err?.response?.data?.message);

      const errorMessage = err?.response?.data?.message || "Login failed";
      navigate("/auth/login");
      toast.error(errorMessage);
    }

  });
  return { isLoading, login };
}

export default useLogin;