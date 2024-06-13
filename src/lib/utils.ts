import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const removeTrailingSlashes = (str: string): string => {
  return str.endsWith("/") ? removeTrailingSlashes(str.slice(0, -1)) : str;
};

// export function handleRateLimiting(e: Error) {
//   if (e instanceof AxiosError) {
//     toast.error("The api is being rate limited");
//     return;
//   }
// }

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
    }

    // Always reject the error so it can be handled by the caller
    return Promise.reject(error);
  }
);

export { usersApi };
