import { apiRequest } from "@/api/requests";
import { useQuery } from "@tanstack/react-query";

export const useApiRequest = ({
  queryKey,
  endpoint,
  method = "GET",
  params = {},
  data = {},
  enabled = true,
}) => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () =>
      apiRequest({
        endpoint,
        method,
        params,
        data,
      }),
    enabled,
  });
};
