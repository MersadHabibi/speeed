"use client";

import { carStyles } from "@/data/carStyles";
import { TCarLine, TCarStyle, TPlayerCar, TPosition } from "@/types";
import { create } from "zustand";

export type State = {
  playerCar: TPlayerCar;
};

export type Actions = {
  setPlayerCar: (playerCar: TPlayerCar) => void;
  getPlayerCarStyleFromLocalStorage: () => void;
  setPlayerCarStyle: (carStyle: TCarStyle) => void;
  setPlayerCarLine: (line: TCarLine) => void;
  setPlayerCarPositions: (position: TPosition) => void;
  setPlayerCarYPosition: (YPosition: number) => void;
  resetPlayerCar: () => void;
};

export const usePlayerCarStore = create<State & Actions>()((set) => ({
  playerCar: {
    line: "center",
    YPosition: 75,
    carStyle: carStyles[0],
  },
  setPlayerCar(playerCar) {
    set({ playerCar });
  },
  getPlayerCarStyleFromLocalStorage() {
    const carStyle = JSON.parse(
      localStorage.getItem("selectedCarStyle") || JSON.stringify(carStyles[0]),
    );

    set((state) => ({ playerCar: { ...state.playerCar, carStyle } }));
  },
  setPlayerCarStyle(carStyle) {
    localStorage.setItem("selectedCarStyle", JSON.stringify(carStyle));

    set((state) => ({ playerCar: { ...state.playerCar, carStyle } }));
  },
  setPlayerCarLine(line) {
    set((state) => ({ playerCar: { ...state.playerCar, line } }));
  },
  setPlayerCarYPosition(YPosition) {
    set((state) => ({ playerCar: { ...state.playerCar, YPosition } }));
  },
  setPlayerCarPositions(positions) {
    set((state) => ({ playerCar: { ...state.playerCar, positions } }));
  },
  resetPlayerCar() {
    set((state) => ({
      playerCar: {
        line: "center",
        YPosition: 75,
        position: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          height: 0,
          width: 0,
        },
        carStyle: state.playerCar.carStyle,
      },
    }));
  },
}));
