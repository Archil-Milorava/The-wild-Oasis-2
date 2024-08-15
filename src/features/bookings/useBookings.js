import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";

export function useBookings() {
  const {data, isLoading} = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });



  return {data, isLoading};
}
