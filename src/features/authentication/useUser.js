import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export default function useUser(){
    const {isLoading: isUserLoading, data: userData} = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser
    })



    return {isUserLoading, userData, isAuthenticated: userData?.role === "authenticated"}
}