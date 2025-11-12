import { QueryClient, QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BACKEND_URL || "";

const apiInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      queryFn: async ({ queryKey, signal }: QueryFunctionContext) => {
        const { data } = await apiInstance.get(String(queryKey[0]), { signal });
        return data;
      },
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});

export default apiInstance;
