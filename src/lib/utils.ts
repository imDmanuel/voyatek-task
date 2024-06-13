import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const removeTrailingSlashes = (str: string): string => {
  return str.endsWith("/") ? removeTrailingSlashes(str.slice(0, -1)) : str;
};
