import { TCarStyle, TFuelItem } from "@/types";
import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function rand(a: number, b: number): number {
  return (
    (a +
      ((b - a + 1) * crypto.getRandomValues(new Uint32Array(1))[0]) / 2 ** 32) |
    0
  );
}

export function addShoppingHistory(info: TCarStyle | TFuelItem) {
  const shopHistory = JSON.parse(
    localStorage.getItem("shopHistory") || JSON.stringify([]),
  );

  localStorage.setItem("shopHistory", JSON.stringify([...shopHistory, info]));
}
