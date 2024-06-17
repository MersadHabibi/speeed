"use client";

import { TPosition } from "@/types";
import { create } from "zustand";

export type State = {
  otherCarsPositions?: TPosition[];
};

export type Actions = {
  setOtherCarsPositions: (positions: TPosition[]) => void;
};

export const useOtherCarsStore = create<State & Actions>()((set) => ({
  setOtherCarsPositions(positions) {
    set({ otherCarsPositions: positions });
  },
}));
