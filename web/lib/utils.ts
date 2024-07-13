import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRealDate = (date: number) => {
  const timestamp = typeof date === "string" ? parseInt(date) : date;
  const realTimestamp = timestamp < 10000000000 ? timestamp * 1000 : timestamp;
  return new Date(realTimestamp).toLocaleString();
};

export const daysToTimestamp = (days: number): number => {
  const millisecondsInADay = 24 * 60 * 60 * 1000; 
  return days * millisecondsInADay;
}
