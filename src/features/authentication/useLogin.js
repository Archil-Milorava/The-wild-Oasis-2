import { useMutation, useQueryClient } from "@tanstack/react-query";
import loginWithEmail from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: userLoginWithEmail, isLoading: isLoggingInWithEmail } =
    useMutation({
      mutationFn: ({ email, password }) => loginWithEmail({ email, password }),
      onSuccess: (user) => {
        queryClient.setQueryData(["user"], user.user);
        navigate("/bookings");
      },
      onError: (error) => {
        throw new Error(error);
      },
    });

  return { userLoginWithEmail, isLoggingInWithEmail };
}
