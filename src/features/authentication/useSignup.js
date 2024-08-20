import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export  function useSignup() {
  const { mutate: userSignUp, error, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Account created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { userSignUp, error, isLoading };
}
