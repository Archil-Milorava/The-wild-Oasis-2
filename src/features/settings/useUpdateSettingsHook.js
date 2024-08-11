import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../../services/apiSettings";

export function useUpdateSettingsHook() {
  //1. fetch data
  const {
    data: settingsData,
    isLoading,
    error,
  } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });


  return { settingsData, error, isLoading };
}
