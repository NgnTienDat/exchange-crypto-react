import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/userService";
import { setCookieToken } from "../utils/helper";

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
      console.log(err);
    //   toast.error(err.response.data.message);
    },
  });
  return { isLoading, login };
}

export default useLogin;