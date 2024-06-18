"use client";

import { TCarLine, TMyCar } from "@/types";
import { create } from "zustand";

export type State = {
  myCar: TMyCar;
};

export type Actions = {
  setMyCar: (myCar: TMyCar) => void;
  setCarLine: (line: TCarLine) => void;
  setCarYPosition: (YPosition: number) => void;
};

export const useMyCarStore = create<State & Actions>()((set) => ({
  myCar: {
    line: "center",
    YPosition: 85,
  },
  setMyCar(myCar) {
    set({ myCar });
  },
  setCarLine(line) {
    set((state) => ({ myCar: { ...state.myCar, line } }));
  },
  setCarYPosition(YPosition) {
    set((state) => ({ myCar: { ...state.myCar, YPosition } }));
  },
}));
