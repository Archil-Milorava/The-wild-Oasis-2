import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export  function useSignup() {
  const navigate = useNavigate();
  const { mutate: userSignUp, error, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Account created successfully");
      navigate("/dashboard")
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { userSignUp, error, isLoading };
}
