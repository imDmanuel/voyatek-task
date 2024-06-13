import axios from "axios";
import { removeTrailingSlashes } from "./utils";
import { toast } from "sonner";

export function useUsersApi() {
  // Create an Axios instance
  const usersApi = axios.create({
    baseURL: removeTrailingSlashes(process.env.NEXT_PUBLIC_API_BASE_URL || ""),
  });

  // Add a response interceptor
  usersApi.interceptors.response.use(
    (response) => response, // Return the response as is if it's successful
    (error) => {
      if (error.response && error.response.status === 429) {
        toast.error("The api is being rate limited", {
          description: error.response.data,
        });
        return;
      }

      // Always reject the error so it can be handled by the caller
      return Promise.reject(error);
    }
  );

  return { usersApi };
}
