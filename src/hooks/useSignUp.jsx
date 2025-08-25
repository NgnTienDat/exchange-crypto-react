import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../services/userService";
import toast from "react-hot-toast";

function useSignUp() {

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { isLoading, mutate: signUp } = useMutation({
    mutationFn: ({ email, password }) =>
      signUpApi({ email, password }),
    onSuccess: () => {     
      navigate("/");
    },
    onError: (err) => {
      console.log("error sign up: ", err?.response?.data?.message);

      const errorMessage = err?.response?.data?.message || "Sign up failed!";
      toast.error(errorMessage);
    }

  });
  return { isLoading, signUp };
}

export default useSignUp;