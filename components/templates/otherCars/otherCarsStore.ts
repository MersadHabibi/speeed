"use client";

import { TOtherCar } from "@/types";
import { create } from "zustand";

export type State = {
  otherCars?: TOtherCar[];
};

export type Actions = {
  setOtherCars: (otherCars: TOtherCar[]) => void;
};

export const useOtherCarsStore = create<State & Actions>()((set) => ({
  setOtherCars(otherCars) {
    set({ otherCars: otherCars });
  },
}));
