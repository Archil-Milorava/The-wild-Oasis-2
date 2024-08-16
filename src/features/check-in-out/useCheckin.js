import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCheckin() {
  const navigate = useNavigate();
  const query = useQueryClient();

  const { isLoading: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: ({bookingId, breakfast}) => {
      updateBooking(bookingId, { status: "checked-in", isPaid: true, ...breakfast });
    },
    onSuccess: () => {
      toast.success(`Booking successfully checked in`),
        query.invalidateQueries({ queryKey: ["bookings"] }),
        navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCheckingIn, checkIn };
}
