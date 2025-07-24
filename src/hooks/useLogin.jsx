import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/userService";
import { setCookieToken } from "../utils/helper";
import toast from "react-hot-toast";

function useLogin() {

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      setCookieToken(user.token);

      queryClient.setQueryData(["user"], {
        ...user,
      });
      navigate("/");
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