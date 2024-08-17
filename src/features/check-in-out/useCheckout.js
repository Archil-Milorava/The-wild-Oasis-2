import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export default function useCheckOut() {
  const query = useQueryClient();
  const navigate = useNavigate()

  const { isLoading: isCheckingOut, mutate: checkOut } = useMutation({
    mutationFn: (bookingId) => {
      updateBooking(bookingId, { status: "checked-out"});

    },
    onSuccess: () => {
      toast.success(`Booking successfully checked out`),
        query.invalidateQueries({ queryKey: ["bookings"] });
        navigate("/")
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCheckingOut, checkOut };
}
