"use client";

import { TCarLine, TPlayerCar } from "@/types";
import { create } from "zustand";

export type State = {
  playerCar: TPlayerCar;
};

export type Actions = {
  setPlayerCar: (playerCar: TPlayerCar) => void;
  setPlayerCarLine: (line: TCarLine) => void;
  setPlayerCarYPosition: (YPosition: number) => void;
};

export const usePlayerCarStore = create<State & Actions>()((set) => ({
  playerCar: {
    line: "center",
    YPosition: 85,
  },
  setPlayerCar(playerCar) {
    set({ playerCar });
  },
  setPlayerCarLine(line) {
    set((state) => ({ playerCar: { ...state.playerCar, line } }));
  },
  setPlayerCarYPosition(YPosition) {
    set((state) => ({ playerCar: { ...state.playerCar, YPosition } }));
  },
}));
