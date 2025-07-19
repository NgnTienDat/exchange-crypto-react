import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { enable2fa } from "../services/authService";

function useTfa() {
  const {  mutate: enableTfa, data } = useMutation({
    mutationFn: enable2fa
  });
  return { data, enableTfa };
}

export default useTfa;