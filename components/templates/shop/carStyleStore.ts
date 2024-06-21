"use client";

import { carStyles } from "@/data/carStyles";

import { TCarStyle } from "@/types";
import { create } from "zustand";

export type State = {
  purchasedCarStyles: TCarStyle[];
};

export type Actions = {
  buyCarStyle: (carStyle: TCarStyle) => void;
  getPurchasedCarStylesFromLocalStorage: () => void;
};

export const useCarStyleStore = create<State & Actions>()((set) => ({
  purchasedCarStyles: [
    {
      ...carStyles[0],
    },
  ],
  buyCarStyle(carStyle) {
    set((state) => {
      const newCarStyles = [...state.purchasedCarStyles, carStyle];

      localStorage.setItem("carStyles", JSON.stringify(newCarStyles));

      return { purchasedCarStyles: newCarStyles };
    });
  },
  getPurchasedCarStylesFromLocalStorage() {
    const purchasedCarStyles = JSON.parse(
      localStorage.getItem("carStyles") || JSON.stringify([carStyles[0]]),
    );

    set({ purchasedCarStyles });
  },
}));
