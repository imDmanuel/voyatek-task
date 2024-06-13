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
