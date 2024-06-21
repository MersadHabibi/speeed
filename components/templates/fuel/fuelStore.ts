"use client";

import { create } from "zustand";

export type State = {
  fuel: number;
};

export type Actions = {
  getFuelFromLocalStorage: () => void;
  setFuel: (fuel: number) => void;
};

export const useFuelStore = create<State & Actions>()((set) => ({
  fuel: 100,
  getFuelFromLocalStorage() {
    const fuel = localStorage.getItem("fuel");

    if (fuel === null) return set({ fuel: 100 });

    set({ fuel: +fuel });
  },
  setFuel(fuel) {
    localStorage.setItem("fuel", fuel.toString());

    set({ fuel });
  },
}));
