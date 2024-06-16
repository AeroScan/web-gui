/* THIRD-PART */
import { QueryClient } from "react-query";

// react-query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnMount: false,
      staleTime: 5 * 60 * 1000,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});

export default queryClient;
