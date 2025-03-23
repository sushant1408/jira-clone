import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateInviteCode(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  /**
   * first generates an array of length provided in "length" arg, populating it by
   * randomly picking a char from 0 to 62 (length of "characters") from "characters" e.g. characters[12], etc
   * and finally joining them to create a string of 6 chars like "12fvj7"
   */
  const code = Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");

  return code;
}

export function snakeToTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
