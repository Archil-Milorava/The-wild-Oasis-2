import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isDeletingBooking, mutate: deleteBookingMutate } =
    useMutation({
      mutationFn: (bookingId) => {
        deleteBooking(bookingId);
      },
      onSuccess: () => {
        toast.success("booking deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["booking"] });
        navigate("/");
      },
      onError: (err) => toast.error(err.message),
    });

  return { isDeletingBooking, deleteBookingMutate };
}
